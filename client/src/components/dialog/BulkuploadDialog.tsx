'use client';

import React, { useEffect, useState } from 'react';
import { showMessage } from './Alert';
import { bulkUpload } from '@/api/applications';

import { Upload, Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

/**
 * Confirm cancel dialog to sent 50 randomly generated applications to the backend
 * Used to test pagination, could consider creating an endpoint to accept a collection of applications to reduce overhead costs of performing 50 POST requests
 */
export default function AddApplicationDialog({
	refresh,
}: {
	refresh: () => void;
}) {
	const [loading, setloading] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (open) {
			setloading(false);
		}
	}, [open]);

	const handleSubmit = async () => {
		try {
			setloading(true);
			await bulkUpload();
			await refresh();
			showMessage('Successfully added!', 'success');
			setOpen(false);
		} catch (error) {
			showMessage('An error occured', 'error');
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Tooltip>
				<TooltipTrigger asChild>
					<DialogTrigger asChild>
						<Button className="cursor-pointer" variant="ghost">
							<Upload className="h-4 w-4" />
						</Button>
					</DialogTrigger>
				</TooltipTrigger>
				<TooltipContent>
					<p>Bulk Upload</p>
				</TooltipContent>
			</Tooltip>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Bulk upload</DialogTitle>
					<DialogDescription>
						This will upload 50 randomly generated applications
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" className="w-[100px]">
							Cancel
						</Button>
					</DialogClose>
					<Button type="submit" onClick={handleSubmit} className="w-[100px]">
						{loading ? <Loader2Icon /> : <p>Confirm</p>}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
