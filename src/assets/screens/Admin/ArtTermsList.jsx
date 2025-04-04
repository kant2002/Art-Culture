// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import ProfilePageContainer from "@components/Blocks/ProfilePageContainer";
// import API from "../../../utils/api.js";
// import Loading from "@components/Blocks/Loading.jsx";
// import LoadingError from "@components/Blocks/LoadingError.jsx";
// import Pagination from "@components/Blocks/Pagination.jsx";
// import {
// 	createColumnHelper,
// 	flexRender,
// 	getCoreRowModel,
// 	getSortedRowModel,
// 	getPaginationRowModel,
// 	getFilteredRowModel,
// 	useReactTable,
// } from "@tanstack/react-table";

// const columnHelper = createColumnHelper();

// const AdminArtTermsList = () => {
// 	const { t } = useTranslation();
// 	const [artTerms, setArtTerms] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(""); // Error state

// 	const columns = [
// 		columnHelper.accessor("id", {
// 			cell: (info) => <a href={`/admin/art-terms/${info.row.getValue("id")}`}>{info.renderValue()}</a>,
// 			header: () => <span>{t("Код")}</span>,
// 		}),
// 		columnHelper.accessor("title_uk", {
// 			cell: (info) => <a href={`/admin/art-terms/${info.row.getValue("id")}`}>{info.renderValue()}</a>,
// 			header: () => <span>{t("Назва українською")}</span>,
// 		}),
// 		columnHelper.accessor("title_en", {
// 			header: () => <span>{t("Назва англійською")}</span>,
// 			cell: (info) => <a href={`/admin/art-terms/${info.row.getValue("id")}`}>{info.renderValue()}</a>,
// 		}),
// 		columnHelper.accessor("description_uk", {
// 			header: () => <span>{t("Опис українською")}</span>,
// 			cell: (info) => info.renderValue(),
// 		}),
// 		columnHelper.accessor("description_en", {
// 			header: () => <span>{t("Опис англійською")}</span>,
// 			cell: (info) => info.renderValue(),
// 		}),
// 	];

// 	useEffect(() => {
// 		const fetchUserPosts = async () => {
// 			try {
// 				const response = await API.get("/art-terms");
// 				setArtTerms(
// 					Array.isArray(response.data?.artTerms) ? response.data?.artTerms : []
// 				);
// 			} catch (err) {
// 				console.error("Loading error:", err);
// 				setError(t("Помилка завантаження"));
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchUserPosts();
// 	}, []);
// 	const table = useReactTable({
// 		data: artTerms,
// 		columns,
// 		getCoreRowModel: getCoreRowModel(),
// 		getSortedRowModel: getSortedRowModel(),
// 		getFilteredRowModel: getFilteredRowModel(),
// 		getPaginationRowModel: getPaginationRowModel(),
// 	});
// 	return (
// 		<ProfilePageContainer>
// 			<h2>{t("Список термінів")}</h2>
// 			{loading ? (
// 				<Loading />
// 			) : error ? (
// 				<LoadingError />
// 			) : artTerms.length === 0 ? (
// 				<p>{t("Термінів немає")}</p>
// 			) : (
// 				<>
// 					<table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
// 						<thead style={{ backgroundColor: "#f0f0f0" }}>
// 							{table.getHeaderGroups().map((headerGroup) => (
// 								<tr key={headerGroup.id}>
// 									{headerGroup.headers.map((header) => (
// 										<th key={header.id} style={{ border: "1px solid black", padding: "8px", verticalAlign: "middle", textAlign: "center" }}>
// 											{header.isPlaceholder ? null : (
// 												<div
// 													style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}
// 													{...{
// 														className: header.column.getCanSort()
// 															? "sortable-header"
// 															: "",
// 														onClick: header.column.getToggleSortingHandler(),
// 													}}
// 												>
// 													{flexRender(
// 														header.column.columnDef.header,
// 														header.getContext()
// 													)}
// 													{header.column.getIsSorted() === "asc" && ' 🔼'}
// 													{header.column.getIsSorted() === "desc" && ' 🔽'}
// 												</div>
// 											)}
// 										</th>
// 									))}
// 								</tr>
// 							))}
// 						</thead>
// 						<tbody>
// 							{table.getRowModel().rows.map((row, rowIndex) => {
// 								const isLastRowEmpty = rowIndex === table.getRowModel().rows.length - 1 && row.getVisibleCells().every(cell => !cell.getValue());
// 								return (
// 									<tr key={row.id} style={isLastRowEmpty ? {} : { border: "1px solid black" }}>
// 										{row.getVisibleCells().map((cell) => (
// 											<td key={cell.id} style={{ padding: "8px", border: isLastRowEmpty ? "none" : "1px solid black" }}>
// 												{flexRender(
// 													cell.column.columnDef.cell,
// 													cell.getContext()
// 												)}
// 											</td>
// 										))}
// 									</tr>
// 								);
// 							})}
// 						</tbody>
// 						<tfoot>
// 							{table.getFooterGroups().map((footerGroup) => (
// 								<tr key={footerGroup.id}>
// 									{footerGroup.headers.map((header) => (
// 										<th key={header.id} style={{ border: "1px solid black", padding: "8px", textAlign: "center" }}>
// 											{header.isPlaceholder
// 												? null
// 												: flexRender(
// 													header.column.columnDef.footer,
// 													header.getContext()
// 												)}
// 										</th>
// 									))}
// 								</tr>
// 							))}
// 						</tfoot>
// 					</table>

// 					<Pagination table={table} />
// 				</>
// 			)}
// 		</ProfilePageContainer>
// 	);
// };

// export default AdminArtTermsList;

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProfilePageContainer from "@components/Blocks/ProfilePageContainer";
import API from "../../../utils/api.js";
import Loading from "@components/Blocks/Loading.jsx";
import LoadingError from "@components/Blocks/LoadingError.jsx";
import Pagination from "@components/Blocks/Pagination.jsx";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	getPaginationRowModel,
	getFilteredRowModel,
	useReactTable,
} from "@tanstack/react-table";
import "../../../styles/components/Blocks/AdminTables.scss";

const columnHelper = createColumnHelper();

const AdminArtTermsList = () => {
	const { t } = useTranslation();
	const [artTerms, setArtTerms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const columns = [
		columnHelper.accessor("id", {
			cell: (info) => <a href={`/admin/art-terms/${info.row.getValue("id")}`}>{info.renderValue()}</a>,
			header: () => <span>{t("Код")}</span>,
		}),
		columnHelper.accessor("title_uk", {
			cell: (info) => <a href={`/admin/art-terms/${info.row.getValue("id")}`}>{info.renderValue()}</a>,
			header: () => <span>{t("Назва українською")}</span>,
		}),
		columnHelper.accessor("title_en", {
			header: () => <span>{t("Назва англійською")}</span>,
			cell: (info) => <a href={`/admin/art-terms/${info.row.getValue("id")}`}>{info.renderValue()}</a>,
		}),
		columnHelper.accessor("description_uk", {
			header: () => <span>{t("Опис українською")}</span>,
			cell: (info) => info.renderValue(),
		}),
		columnHelper.accessor("description_en", {
			header: () => <span>{t("Опис англійською")}</span>,
			cell: (info) => info.renderValue(),
		}),
	];

	useEffect(() => {
		const fetchArtTerms = async () => {
			try {
				const response = await API.get("/art-terms");
				setArtTerms(Array.isArray(response.data?.artTerms) ? response.data.artTerms : []);
			} catch (err) {
				setError(t("Помилка завантаження"));
			} finally {
				setLoading(false);
			}
		};

		fetchArtTerms();
	}, []);

	const table = useReactTable({
		data: artTerms,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<ProfilePageContainer>
			<h2>{t("Список термінів")}</h2>
			{loading ? <Loading /> : error ? <LoadingError /> : artTerms.length === 0 ? (
				<p>{t("Термінів немає")}</p>
			) : (
				<>
					<table className="admin-table">
						<thead>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th key={header.id}>
											{header.isPlaceholder ? null : (
												<div
													className="sortable-header"
													onClick={header.column.getToggleSortingHandler()}
												>
													{flexRender(header.column.columnDef.header, header.getContext())}
													{header.column.getIsSorted() ? (header.column.getIsSorted() === "asc" ? " 🔼" : " 🔽") : null}
												</div>
											)}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row) => (
								<tr key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
					<Pagination table={table} />
				</>
			)}
		</ProfilePageContainer>
	);
};

export default AdminArtTermsList;
