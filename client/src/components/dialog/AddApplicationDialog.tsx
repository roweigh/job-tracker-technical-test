'use client';

import React, { useEffect, useState } from 'react';
import { showMessage } from './Alert';
import { addApplication } from '@/api/applications';

import { Plus } from 'lucide-react';
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
	DialogTrigger,
} from '@/components/ui/dialog';

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export default function AddApplicationDialog({ refresh = async () => {} }) {
	const [open, setOpen] = useState(false);

	// User input
	const [companyName, setCompanyName] = useState('');
	const [position, setPosition] = useState('');

	useEffect(() => {
		if (open) {
			// Reset form
			setCompanyName('');
			setPosition('');
		}
	}, [open]);

	const handleSubmit = async () => {
		const payload = {
			companyName,
			position,
			status: 'Applied',
			dateApplied: new Date().toISOString(),
		};
		try {
			await addApplication(payload);
			await refresh();
			showMessage('Successfully added!', 'success');
			setOpen(false);
		} catch (error) {
			showMessage('An error occured', 'error');
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<form>
				<Tooltip>
					<TooltipTrigger asChild>
						<DialogTrigger asChild>
							<Button className="cursor-pointer" variant="ghost">
								<Plus className="h-4 w-4" />
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p>Add</p>
					</TooltipContent>
				</Tooltip>

				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add new application</DialogTitle>
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
					</div>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit" onClick={handleSubmit}>
							Add
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
