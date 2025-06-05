'use client';

import React, { useEffect, useState } from 'react';
import { showMessage } from '@/components/dialog/Alert';
import { getApplications, Application, Pagination } from '@/api/applications';

import { columns } from '@/components/table/Columns';
import DataTable from '@/components/table/DataTable';
import BulkUploadDialog from '@/components/dialog/BulkuploadDialog';
import AddApplicationDialog from '@/components/dialog/AddApplicationDialog';
import EditApplicationDialog from '@/components/dialog/EditApplicationDialog';

// Fetch applications on initial page load
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
			showMessage('An error occured', 'error');
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
	const refreshApplications = () => {
		fetchApplications(pagination);
		setEditDialog(false);
	};

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
				<BulkUploadDialog refresh={refreshApplications} />
				<AddApplicationDialog refresh={refreshApplications} />
				<EditApplicationDialog
					id={appId}
					open={editDialog}
					setOpen={setEditDialog}
					refresh={refreshApplications}
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
