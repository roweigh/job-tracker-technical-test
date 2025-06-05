'use client';

import React from 'react';
import { useEffect, useState } from 'react';

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
	refresh: () => Promise<void>;
}

export default function EditApplicationDialog({
	id,
	open,
	setOpen,
	refresh,
}: EditApplicationDialogProps) {
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

		id && fetchData(id);
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
			await updateApplication(id, payload);
			await refresh();
			setOpen(false);
		} catch (error) {
			//
		} finally {
			//
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
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="Interview">Interview</SelectItem>
										<SelectItem value="Offer">Offer</SelectItem>
										<SelectItem value="Rejected">Rejected</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit" onClick={handleSubmit}>
							Update
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
