'use client';

import React, { useEffect, useState } from 'react';
import { getApplications, Application } from '@/api/applications';

import { columns } from '@/components/table/Columns';
import { DataTable } from '@/components/table/DataTable';
import EditApplicationDialog from '@/components/dialog/EditApplicationDialog';
import AddApplicationDialog from '@/components/dialog/AddApplicationDialog';

// Fetch applications on initial page load
function useGetApplications() {
	const [applications, setApplications] = useState([]);
	const fetchApplications = async () => {
		const { data } = await getApplications();
		setApplications(data);
	};

	useEffect(() => {
		fetchApplications();
	}, []);

	return { fetchApplications, applications };
}

export default function Home() {
	const { fetchApplications, applications } = useGetApplications();
	const [appId, setAppId] = useState<string | null>(null);
	const [editDialog, setEditDialog] = useState<boolean>(false);

	// Fetch applications after each update
	const refreshApplications = async () => {
		await fetchApplications();
		setEditDialog(false);
	};

	const setEdit = (v: Application) => {
		setAppId(v.id ?? null);
		setEditDialog(!!v);
	};

	return (
		<main className="mx-auto my-[60px] w-1/2 flex flex-col gap-[8px]">
			<EditApplicationDialog
				id={appId}
				open={editDialog}
				setOpen={setEditDialog}
				refresh={refreshApplications}
			/>
			<div className="flex">
				<span className="mr-auto text-3xl font-bold select-none">
					Applications
				</span>
				<AddApplicationDialog refresh={refreshApplications} />
			</div>

			<DataTable columns={columns} data={applications} onEdit={setEdit} />
		</main>
	);
}
