import React from 'react';

import { columns, Application } from './Columns';
import { DataTable } from './DataTable';

export default function ApplicationTable({ data, setEdit }) {
	return <DataTable columns={columns} data={data} setEdit={setEdit} />;
}
