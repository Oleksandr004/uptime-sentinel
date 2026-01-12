import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { robotoFontBase64 } from '@/shared/lib/fonts/roboto-base64'

export const exportToPDF = (data: any) => {
	const doc = new jsPDF()

	// 1. Добавляем шрифт в VFS (Virtual File System) jsPDF
	doc.addFileToVFS('Roboto-Regular.ttf', robotoFontBase64)
	doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal')

	// 2. Устанавливаем его как основной
	doc.setFont('Roboto')

	doc.setFontSize(18)
	doc.text(`Отчет по монитору: ${data.name}`, 14, 15)

	doc.setFontSize(10)
	doc.text(`Дата выгрузки: ${new Date().toLocaleString()}`, 14, 22)

	const tableData = data.checks.map((h: any) => [
		new Date(h.createdAt).toLocaleString(),
		h.status,
		`${h.responseTime}ms`,
	])

	autoTable(doc, {
		head: [['Дата / Время', 'Статус', 'Задержка']],
		body: tableData,
		startY: 30,
		// 3. ВАЖНО: Указываем шрифт для таблицы отдельно
		styles: { font: 'Roboto', fontSize: 9 },
		headStyles: { fillColor: [59, 130, 246] },
	})

	doc.save(`report-${data.name}.pdf`)
}
