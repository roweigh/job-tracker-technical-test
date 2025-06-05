import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Application } from '@/api/applications';

export const columns: ColumnDef<Application>[] = [
	{
		accessorKey: 'companyName',
		header: 'Company Name',
	},
	{
		accessorKey: 'position',
		header: 'Position',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.original.status;
			let className = '';

			switch (status) {
				case 'Rejected':
					className = 'bg-red-500 select-none';
					break;
				case 'Interview':
					className = 'bg-amber-500 select-none';
					break;
				case 'Offer':
					className = 'bg-green-500 select-none';
					break;
				default:
					className = 'select-none';
					break;
			}
			return <Badge className={className}>{status}</Badge>;
		},
	},
	{
		accessorKey: 'dateApplied',
		header: 'Date Applied',
		cell: ({ row }) => {
			return (
				<span>{new Date(row.original.dateApplied).toLocaleDateString()}</span>
			);
		},
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
	},
];
