'use client';

import React, { useEffect, useState } from 'react';
import { handle } from '@/api/api-utils';
import { getApplications, Application, Pagination } from '@/api/applications';

import { columns } from '@/components/table/Columns';
import DataTable from '@/components/table/DataTable';
import BulkUploadDialog from '@/components/dialog/BulkuploadDialog';
import AddApplicationDialog from '@/components/dialog/AddApplicationDialog';
import EditApplicationDialog from '@/components/dialog/EditApplicationDialog';

// Fetch applications when table paginates, then update pagination information
function useGetApplications() {
	const [applications, setApplications] = useState([]);
	const [pagination, setPagination] = useState({
		page: 1,
		size: 20,
		totalElements: 0,
		totalPages: 1,
		first: true,
		last: true,
	});

	const fetchApplications = async (pagination: Pagination) => {
		try {
			const { data } = await getApplications(pagination);
			setApplications(data.content);
			setPagination({
				page: data.page,
				size: data.size,
				totalElements: data.totalElements,
				totalPages: data.totalPages,
				first: data.first,
				last: data.last,
			});
		} catch (error) {
			handle(error);
		}
	};

	return { fetchApplications, applications, pagination };
}

export default function Home() {
	const [appId, setAppId] = useState<string | null>(null);
	const [editDialog, setEditDialog] = useState<boolean>(false);

	const { fetchApplications, applications, pagination } = useGetApplications();

	useEffect(() => {
		fetchApplications(pagination);
	}, []);

	// Fetch applications after each update
	const refresh = () => {
		fetchApplications(pagination);
		setEditDialog(false);
	};

	// Opens/closes edit application dialog
	const setEdit = (v: Application) => {
		setAppId(v.id ?? null);
		setEditDialog(!!v);
	};

	return (
		<main className="min-w-2xs mx-[5%] my-[40px] lg:mx-auto lg:my-[60px] lg:w-1/2 flex flex-col gap-[8px]">
			<div className="flex">
				<span className="mr-auto text-3xl font-bold select-none">
					Applications
				</span>

				{/* CRUD Dialogs */}
				<BulkUploadDialog refresh={refresh} />
				<AddApplicationDialog refresh={refresh} />
				<EditApplicationDialog
					id={appId}
					open={editDialog}
					setOpen={setEditDialog}
					refresh={refresh}
				/>
			</div>

			<DataTable
				columns={columns}
				data={applications}
				pagination={pagination}
				setPagination={fetchApplications}
				setEdit={setEdit}
			/>
		</main>
	);
}
