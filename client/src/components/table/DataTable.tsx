import { useMemo } from 'react';
import { Pagination } from '@/api/applications';

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Pencil,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pagination: Pagination;
	setPagination: (pagination: Pagination) => void;
	setEdit: (row: TData) => void;
}

export default function DataTable<TData, TValue>({
	columns,
	data,
	pagination,
	setPagination,
	setEdit,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
	});

	return (
		<div>
			<TablePagination pagination={pagination} setPagination={setPagination} />

			<div className="rounded-md border my-2">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map(cell => {
										if (cell.column.id === 'actions') {
											return (
												<td key={cell.id} className="flex justify-center">
													<Button
														className="cursor-pointer"
														variant="ghost"
														onClick={() => setEdit(cell.row.original)}
													>
														<Pencil className="h-4 w-4" />
													</Button>
												</td>
											);
										} else {
											return (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</TableCell>
											);
										}
									})}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<TablePagination pagination={pagination} setPagination={setPagination} />
		</div>
	);
}

/**
 * Table pagination controls
 */
function TablePagination({
	pagination,
	setPagination,
}: {
	pagination: Pagination;
	setPagination: (v: Pagination) => void;
}) {
	const lowerBound = useMemo(() => {
		const result = (pagination.page - 1) * pagination.size + 1;
		if (result > pagination.totalElements) {
			return pagination.totalElements;
		} else {
			return result;
		}
	}, [pagination]);

	const upperbound = useMemo(() => {
		const result = pagination.page * pagination.size;
		if (result > pagination.totalElements) {
			return pagination.totalElements;
		} else {
			return result;
		}
	}, [pagination]);

	return (
		<div className="flex justify-end items-center space-x-2">
			{/* Rows Per Page */}
			<div className="flex items-center space-x-2">
				<p className="text-sm font-medium">Rows per page</p>
				<Select
					value={`${pagination.size}`}
					onValueChange={e => {
						setPagination({ ...pagination, page: 1, size: Number(e) });
					}}
				>
					<SelectTrigger className="h-8 w-[70px]">
						<SelectValue placeholder={pagination.size} />
					</SelectTrigger>
					<SelectContent side="top">
						{[10, 20, 25, 30, 40, 50].map(pageSize => (
							<SelectItem key={pageSize} value={`${pageSize}`}>
								{pageSize}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<p className="text-sm font-medium">
					{lowerBound} - {upperbound} of {pagination.totalElements}
				</p>
			</div>

			{/* Pagination controls*/}
			<Button
				variant="ghost"
				size="icon"
				className="hidden size-8 lg:flex"
				onClick={() => {
					setPagination({ ...pagination, page: 1 });
				}}
				disabled={pagination.first}
			>
				<ChevronsLeft />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className="size-8"
				onClick={() => {
					setPagination({ ...pagination, page: pagination.page - 1 });
				}}
				disabled={pagination.first}
			>
				<ChevronLeft />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className="size-8"
				onClick={() => {
					setPagination({ ...pagination, page: pagination.page + 1 });
				}}
				disabled={pagination.last}
			>
				<ChevronRight />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className="hidden size-8 lg:flex"
				onClick={() => {
					setPagination({ ...pagination, page: pagination.totalPages });
				}}
				disabled={pagination.last}
			>
				<ChevronsRight />
			</Button>
		</div>
	);
}
