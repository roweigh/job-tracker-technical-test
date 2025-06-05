'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { handle } from '@/api/api-utils';
import { showMessage } from '@/components/dialog/Alert';

import { Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { updateApplication, getApplication } from '@/api/applications';

interface EditApplicationDialogProps {
	id: string | null;
	open: boolean;
	setOpen: (v: boolean) => void;
	refresh: () => void;
}

/**
 * Dialog for updating existing application
 */
export default function EditApplicationDialog({
	id,
	open,
	setOpen,
	refresh,
}: EditApplicationDialogProps) {
	const [loading, setloading] = useState(false);
	const [companyName, setCompanyName] = useState('');
	const [position, setPosition] = useState('');
	const [status, setStatus] = useState('');
	const [dateApplied, setDateApplied] = useState('');

	useEffect(() => {
		async function fetchData(id: string) {
			await getApplication(id).then(({ data }) => {
				setCompanyName(data.companyName);
				setPosition(data.position);
				setStatus(data.status);
				setDateApplied(data.dateApplied);
			});
		}

		if (open) {
			setloading(false);
			id && fetchData(id);
		}
	}, [open]);

	const handleSubmit = async () => {
		if (!id) return;
		const payload = {
			id: id,
			companyName,
			position,
			status,
			dateApplied,
		};
		try {
			setloading(true);
			await updateApplication(id, payload);
			await refresh();
			showMessage('Successfully updated!', 'success');
			setOpen(false);
		} catch (error) {
			handle(error);
		}
	};

	return (
		<Dialog open={!!open} onOpenChange={setOpen}>
			<form>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit application</DialogTitle>
						<DialogDescription />
					</DialogHeader>

					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label>Company Name</Label>
							<Input
								value={companyName}
								onChange={e => {
									setCompanyName(e.target.value);
								}}
							/>
						</div>

						<div className="grid gap-2">
							<Label>Position</Label>
							<Input
								value={position}
								onChange={e => {
									setPosition(e.target.value);
								}}
							/>
						</div>

						<div className="grid gap-2">
							<Label>Status</Label>
							<Select
								value={status}
								onValueChange={e => {
									setStatus(e);
								}}
							>
								<SelectTrigger className="w-[100%]">
									<SelectValue placeholder={status} />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{['Applied', 'Interview', 'Offer', 'Rejected'].map(
											value => (
												<SelectItem key={value} value={`${value}`}>
													{value}
												</SelectItem>
											)
										)}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline" className="w-[100px]">
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit" onClick={handleSubmit} className="w-[100px]">
							{loading ? <Loader2Icon /> : <p>Update</p>}
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
