(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/monitor/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MonitorDetailsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// 'use client'
// import { useParams } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import {
// 	XAxis,
// 	YAxis,
// 	CartesianGrid,
// 	Tooltip,
// 	ResponsiveContainer,
// 	AreaChart,
// 	Area,
// } from 'recharts'
// import {
// 	ArrowLeft,
// 	Activity,
// 	AlertTriangle,
// 	Zap,
// 	Percent,
// 	ShieldCheck,
// } from 'lucide-react'
// import Link from 'next/link'
// export default function MonitorDetailsPage() {
// 	const { id } = useParams()
// 	const [data, setData] = useState<any>(null)
// 	useEffect(() => {
// 		fetch(
// 			`${
// 				process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
// 			}/monitors/${id}`
// 		)
// 			.then((res) => res.json())
// 			.then(setData)
// 	}, [id])
// 	if (!data || !data.checks) {
// 		return (
// 			<div className='p-10 text-center text-slate-500 animate-pulse'>
// 				Загрузка детальной статистики...
// 			</div>
// 		)
// 	}
// 	// --- Расчет статистики ---
// 	const totalChecks = data.checks.length
// 	const upChecks = data.checks.filter((c: any) => c.status === 'UP').length
// 	const uptimePercentage =
// 		totalChecks > 0 ? ((upChecks / totalChecks) * 100).toFixed(2) : '0.00'
// 	const avgLatency =
// 		totalChecks > 0
// 			? Math.round(
// 					data.checks.reduce(
// 						(acc: number, curr: any) => acc + curr.responseTime,
// 						0
// 					) / totalChecks
// 			  )
// 			: 0
// 	const downEvents = data.checks.filter((c: any) => c.status === 'DOWN').length
// 	const history = data.checks.map((c: any) => ({
// 		time: new Date(c.createdAt).toLocaleTimeString([], {
// 			hour: '2-digit',
// 			minute: '2-digit',
// 		}),
// 		ms: c.responseTime,
// 		status: c.status,
// 	}))
// 	return (
// 		<main className='min-h-screen bg-slate-50 p-6 md:p-12'>
// 			<div className='max-w-6xl mx-auto'>
// 				{/* Хедер страницы */}
// 				<Link
// 					href='/'
// 					className='flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 group'
// 				>
// 					<ArrowLeft
// 						size={18}
// 						className='group-hover:-translate-x-1 transition-transform'
// 					/>{' '}
// 					Назад к дашборду
// 				</Link>
// 				<div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8'>
// 					<div>
// 						<h1 className='text-4xl font-black text-slate-900 tracking-tight'>
// 							{data.name}
// 						</h1>
// 						<p className='text-slate-500 text-lg'>{data.url}</p>
// 					</div>
// 					<div
// 						className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-sm ${
// 							data.status === 'UP'
// 								? 'bg-green-100 text-green-700'
// 								: 'bg-red-100 text-red-700'
// 						}`}
// 					>
// 						<div
// 							className={`w-2 h-2 rounded-full ${
// 								data.status === 'UP' ? 'bg-green-600' : 'bg-red-600'
// 							} animate-pulse`}
// 						/>
// 						{data.status}
// 					</div>
// 				</div>
// 				{/* ШАГ 2: ВИЗУАЛИЗАЦИЯ СТАТИСТИКИ (Dashboard Cards) */}
// 				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
// 					{/* Uptime Card */}
// 					<div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5'>
// 						<div className='p-4 bg-green-50 text-green-600 rounded-2xl'>
// 							<ShieldCheck size={28} />
// 						</div>
// 						<div>
// 							<p className='text-sm font-bold text-slate-400 uppercase tracking-wider'>
// 								Доступность
// 							</p>
// 							<p className='text-3xl font-black text-slate-800'>
// 								{uptimePercentage}%
// 							</p>
// 						</div>
// 					</div>
// 					{/* Latency Card */}
// 					<div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5'>
// 						<div className='p-4 bg-blue-50 text-blue-600 rounded-2xl'>
// 							<Zap size={28} />
// 						</div>
// 						<div>
// 							<p className='text-sm font-bold text-slate-400 uppercase tracking-wider'>
// 								Средний ответ
// 							</p>
// 							<p className='text-3xl font-black text-slate-800'>
// 								{avgLatency}{' '}
// 								<span className='text-lg font-medium text-slate-400'>ms</span>
// 							</p>
// 						</div>
// 					</div>
// 					{/* Incidents Card */}
// 					<div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5'>
// 						<div className='p-4 bg-red-50 text-red-600 rounded-2xl'>
// 							<AlertTriangle size={28} />
// 						</div>
// 						<div>
// 							<p className='text-sm font-bold text-slate-400 uppercase tracking-wider'>
// 								Инциденты
// 							</p>
// 							<p className='text-3xl font-black text-slate-800'>{downEvents}</p>
// 						</div>
// 					</div>
// 				</div>
// 				{/* Большой график */}
// 				<div className='bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8'>
// 					<h2 className='text-xl font-bold mb-6 flex items-center gap-2 text-slate-800'>
// 						<Activity className='text-blue-500' /> Производительность (24ч)
// 					</h2>
// 					<div className='h-[300px] w-full'>
// 						<ResponsiveContainer width='100%' height='100%'>
// 							<AreaChart data={history}>
// 								<defs>
// 									<linearGradient id='colorMs' x1='0' y1='0' x2='0' y2='1'>
// 										<stop offset='5%' stopColor='#3b82f6' stopOpacity={0.2} />
// 										<stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
// 									</linearGradient>
// 								</defs>
// 								<CartesianGrid
// 									strokeDasharray='3 3'
// 									vertical={false}
// 									stroke='#f1f5f9'
// 								/>
// 								<XAxis dataKey='time' hide />
// 								<YAxis
// 									unit='ms'
// 									stroke='#94a3b8'
// 									fontSize={12}
// 									tickLine={false}
// 									axisLine={false}
// 								/>
// 								<Tooltip
// 									contentStyle={{
// 										borderRadius: '16px',
// 										border: 'none',
// 										boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
// 									}}
// 								/>
// 								<Area
// 									type='monotone'
// 									dataKey='ms'
// 									stroke='#3b82f6'
// 									strokeWidth={4}
// 									fillOpacity={1}
// 									fill='url(#colorMs)'
// 								/>
// 							</AreaChart>
// 						</ResponsiveContainer>
// 					</div>
// 				</div>
// 				{/* Таблица инцидентов */}
// 				<div className='bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden'>
// 					<div className='p-6 border-b border-slate-100'>
// 						<h2 className='text-xl font-bold flex items-center gap-2 text-slate-800'>
// 							<AlertTriangle className='text-amber-500' /> Журнал сбоев
// 						</h2>
// 					</div>
// 					<div className='overflow-x-auto'>
// 						<table className='w-full text-left'>
// 							<thead className='bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest'>
// 								<tr>
// 									<th className='px-6 py-4'>Дата и время</th>
// 									<th className='px-6 py-4'>Статус</th>
// 									<th className='px-6 py-4'>Код ответа</th>
// 									<th className='px-6 py-4'>Задержка</th>
// 								</tr>
// 							</thead>
// 							<tbody className='divide-y divide-slate-100'>
// 								{data.checks.filter((c: any) => c.status === 'DOWN').length ===
// 								0 ? (
// 									<tr>
// 										<td
// 											colSpan={4}
// 											className='px-6 py-12 text-center text-slate-400 font-medium'
// 										>
// 											Система работала без сбоев за выбранный период.
// 										</td>
// 									</tr>
// 								) : (
// 									data.checks
// 										.filter((c: any) => c.status === 'DOWN')
// 										.reverse()
// 										.map((incident: any) => (
// 											<tr
// 												key={incident.id}
// 												className='hover:bg-slate-50 transition-colors'
// 											>
// 												<td className='px-6 py-4 text-sm text-slate-600 font-medium'>
// 													{new Date(incident.createdAt).toLocaleString()}
// 												</td>
// 												<td className='px-6 py-4'>
// 													<span className='px-2 py-1 bg-red-100 text-red-600 rounded-lg text-[10px] font-bold'>
// 														DOWN
// 													</span>
// 												</td>
// 												<td className='px-6 py-4 text-sm font-mono text-slate-500'>
// 													{incident.statusCode || 'Timeout'}
// 												</td>
// 												<td className='px-6 py-4 text-sm text-slate-500 font-medium'>
// 													{incident.responseTime}ms
// 												</td>
// 											</tr>
// 										))
// 								)}
// 							</tbody>
// 						</table>
// 					</div>
// 				</div>
// 			</div>
// 		</main>
// 	)
// }
'use client';
;
;
;
;
;
function MonitorDetailsPage() {
    _s();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MonitorDetailsPage.useEffect": ()=>{
            fetch(`${("TURBOPACK compile-time value", "http://localhost:5000") || 'http://localhost:5000'}/monitors/${id}`).then({
                "MonitorDetailsPage.useEffect": (res)=>res.json()
            }["MonitorDetailsPage.useEffect"]).then(setData);
        }
    }["MonitorDetailsPage.useEffect"], [
        id
    ]);
    if (!data || !data.checks) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-10 text-center text-slate-500 dark:text-slate-400 animate-pulse",
            children: "Загрузка детальной статистики..."
        }, void 0, false, {
            fileName: "[project]/app/monitor/[id]/page.tsx",
            lineNumber: 305,
            columnNumber: 4
        }, this);
    }
    // --- Расчёт статистики ---
    const totalChecks = data.checks.length;
    const upChecks = data.checks.filter((c)=>c.status === 'UP').length;
    const uptimePercentage = totalChecks > 0 ? (upChecks / totalChecks * 100).toFixed(2) : '0.00';
    const avgLatency = totalChecks > 0 ? Math.round(data.checks.reduce((acc, curr)=>acc + curr.responseTime, 0) / totalChecks) : 0;
    const downEvents = data.checks.filter((c)=>c.status === 'DOWN').length;
    const history = data.checks.map((c)=>({
            time: new Date(c.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            }),
            ms: c.responseTime
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-6 group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            size: 18,
                            className: "group-hover:-translate-x-1 transition-transform"
                        }, void 0, false, {
                            fileName: "[project]/app/monitor/[id]/page.tsx",
                            lineNumber: 345,
                            columnNumber: 6
                        }, this),
                        "Назад к дашборду"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/monitor/[id]/page.tsx",
                    lineNumber: 341,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100",
                                    children: data.name
                                }, void 0, false, {
                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                    lineNumber: 355,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-500 dark:text-slate-400 text-lg",
                                    children: data.url
                                }, void 0, false, {
                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                    lineNumber: 358,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/monitor/[id]/page.tsx",
                            lineNumber: 354,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-sm ${data.status === 'UP' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-2 h-2 rounded-full animate-pulse ${data.status === 'UP' ? 'bg-green-600 dark:bg-green-400' : 'bg-red-600 dark:bg-red-400'}`
                                }, void 0, false, {
                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                    lineNumber: 370,
                                    columnNumber: 7
                                }, this),
                                data.status
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/monitor/[id]/page.tsx",
                            lineNumber: 363,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/monitor/[id]/page.tsx",
                    lineNumber: 353,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-2xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                        size: 28
                                    }, void 0, false, {
                                        fileName: "[project]/app/monitor/[id]/page.tsx",
                                        lineNumber: 386,
                                        columnNumber: 8
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                    lineNumber: 385,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold text-slate-400 uppercase tracking-wider",
                                            children: "Доступность"
                                        }, void 0, false, {
                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                            lineNumber: 389,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-3xl font-black text-slate-800 dark:text-slate-100",
                                            children: [
                                                uptimePercentage,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                            lineNumber: 392,
                                            columnNumber: 8
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                    lineNumber: 388,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/monitor/[id]/page.tsx",
                            lineNumber: 384,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-2xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                        size: 28
                                    }, void 0, false, {
                                        fileName: "[project]/app/monitor/[id]/page.tsx",
                                        lineNumber: 401,
                                        columnNumber: 8
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                    lineNumber: 400,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold text-slate-400 uppercase tracking-wider",
                                            children: "Средний ответ"
                                        }, void 0, false, {
                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                            lineNumber: 404,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-3xl font-black text-slate-800 dark:text-slate-100",
                                            children: [
                                                avgLatency,
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-lg font-medium text-slate-400",
                                                    children: "ms"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 9
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                            lineNumber: 407,
                                            columnNumber: 8
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                    lineNumber: 403,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/monitor/[id]/page.tsx",
                            lineNumber: 399,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-2xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        size: 28
                                    }, void 0, false, {
                                        fileName: "[project]/app/monitor/[id]/page.tsx",
                                        lineNumber: 417,
                                        columnNumber: 8
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                    lineNumber: 416,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold text-slate-400 uppercase tracking-wider",
                                            children: "Инциденты"
                                        }, void 0, false, {
                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                            lineNumber: 420,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-3xl font-black text-slate-800 dark:text-slate-100",
                                            children: downEvents
                                        }, void 0, false, {
                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                            lineNumber: 423,
                                            columnNumber: 8
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                    lineNumber: 419,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/monitor/[id]/page.tsx",
                            lineNumber: 415,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/monitor/[id]/page.tsx",
                    lineNumber: 382,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-slate-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                    className: "text-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                    lineNumber: 433,
                                    columnNumber: 7
                                }, this),
                                " Производительность (24ч)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/monitor/[id]/page.tsx",
                            lineNumber: 432,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-[300px] w-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                width: "100%",
                                height: "100%",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                                    data: history,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                id: "colorMs",
                                                x1: "0",
                                                y1: "0",
                                                x2: "0",
                                                y2: "1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "5%",
                                                        stopColor: "#3b82f6",
                                                        stopOpacity: 0.25
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/monitor/[id]/page.tsx",
                                                        lineNumber: 441,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "95%",
                                                        stopColor: "#3b82f6",
                                                        stopOpacity: 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/monitor/[id]/page.tsx",
                                                        lineNumber: 442,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/monitor/[id]/page.tsx",
                                                lineNumber: 440,
                                                columnNumber: 10
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                            lineNumber: 439,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                            strokeDasharray: "3 3",
                                            vertical: false,
                                            stroke: "#334155",
                                            opacity: 0.2
                                        }, void 0, false, {
                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                            lineNumber: 446,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                            dataKey: "time",
                                            hide: true
                                        }, void 0, false, {
                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                            lineNumber: 453,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                            unit: "ms",
                                            stroke: "#94a3b8",
                                            fontSize: 12,
                                            tickLine: false,
                                            axisLine: false
                                        }, void 0, false, {
                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                            lineNumber: 454,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                            contentStyle: {
                                                background: '#020617',
                                                borderRadius: '14px',
                                                border: '1px solid #1e293b',
                                                color: '#e5e7eb'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                            lineNumber: 462,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                            type: "monotone",
                                            dataKey: "ms",
                                            stroke: "#3b82f6",
                                            strokeWidth: 3,
                                            fill: "url(#colorMs)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                            lineNumber: 471,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                    lineNumber: 438,
                                    columnNumber: 8
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/monitor/[id]/page.tsx",
                                lineNumber: 437,
                                columnNumber: 7
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/monitor/[id]/page.tsx",
                            lineNumber: 436,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/monitor/[id]/page.tsx",
                    lineNumber: 431,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 border-b border-slate-100 dark:border-slate-800",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        className: "text-amber-500"
                                    }, void 0, false, {
                                        fileName: "[project]/app/monitor/[id]/page.tsx",
                                        lineNumber: 487,
                                        columnNumber: 8
                                    }, this),
                                    " Журнал сбоев"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/monitor/[id]/page.tsx",
                                lineNumber: 486,
                                columnNumber: 7
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/monitor/[id]/page.tsx",
                            lineNumber: 485,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        className: "bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase text-[10px] font-bold tracking-widest",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-6 py-4",
                                                    children: "Дата и время"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-6 py-4",
                                                    children: "Статус"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-6 py-4",
                                                    children: "Код"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                                    lineNumber: 497,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-6 py-4",
                                                    children: "Задержка"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/monitor/[id]/page.tsx",
                                                    lineNumber: 498,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                            lineNumber: 494,
                                            columnNumber: 9
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/monitor/[id]/page.tsx",
                                        lineNumber: 493,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        className: "divide-y divide-slate-100 dark:divide-slate-800",
                                        children: data.checks.filter((c)=>c.status === 'DOWN').length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 4,
                                                className: "px-6 py-12 text-center text-slate-400",
                                                children: "Сбоев не зафиксировано"
                                            }, void 0, false, {
                                                fileName: "[project]/app/monitor/[id]/page.tsx",
                                                lineNumber: 505,
                                                columnNumber: 11
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                            lineNumber: 504,
                                            columnNumber: 10
                                        }, this) : data.checks.filter((c)=>c.status === 'DOWN').reverse().map((incident)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 text-sm text-slate-600 dark:text-slate-300",
                                                        children: new Date(incident.createdAt).toLocaleString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/monitor/[id]/page.tsx",
                                                        lineNumber: 521,
                                                        columnNumber: 13
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-2 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-[10px] font-bold",
                                                            children: "DOWN"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/monitor/[id]/page.tsx",
                                                            lineNumber: 525,
                                                            columnNumber: 14
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/monitor/[id]/page.tsx",
                                                        lineNumber: 524,
                                                        columnNumber: 13
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 text-sm font-mono text-slate-500",
                                                        children: incident.statusCode || 'Timeout'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/monitor/[id]/page.tsx",
                                                        lineNumber: 529,
                                                        columnNumber: 13
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-6 py-4 text-sm text-slate-500",
                                                        children: [
                                                            incident.responseTime,
                                                            "ms"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/monitor/[id]/page.tsx",
                                                        lineNumber: 532,
                                                        columnNumber: 13
                                                    }, this)
                                                ]
                                            }, incident.id, true, {
                                                fileName: "[project]/app/monitor/[id]/page.tsx",
                                                lineNumber: 517,
                                                columnNumber: 12
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/monitor/[id]/page.tsx",
                                        lineNumber: 501,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/monitor/[id]/page.tsx",
                                lineNumber: 492,
                                columnNumber: 7
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/monitor/[id]/page.tsx",
                            lineNumber: 491,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/monitor/[id]/page.tsx",
                    lineNumber: 484,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/monitor/[id]/page.tsx",
            lineNumber: 339,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/monitor/[id]/page.tsx",
        lineNumber: 338,
        columnNumber: 3
    }, this);
}
_s(MonitorDetailsPage, "bKWtrFi4rDiB0nUS9DgR6D7F0mg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = MonitorDetailsPage;
var _c;
__turbopack_context__.k.register(_c, "MonitorDetailsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_monitor_%5Bid%5D_page_tsx_78774734._.js.map