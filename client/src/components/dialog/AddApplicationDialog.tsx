'use client';

import React, { useEffect, useState } from 'react';
import { handle } from '@/api/api-utils';
import { showMessage } from '@/components/dialog/Alert';
import { addApplication } from '@/api/applications';

import { Plus, Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

const FormSchema = z.object({
  companyName: z.string()
    .min(1, { message: 'Required' })
    .max(255, { message:' Max length 255 characters' }),
  position: z.string()
    .min(1, { message: 'Required' })
    .max(255, { message:' Max length 255 characters' })
});

/**
 * Dialog for adding a new application
 */
export default function AddApplicationDialog({
  refresh
}: {
  refresh: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: '',
      position: ''
    }
  });
	
  useEffect(() => {
    if (open) {
      setloading(false);
      form.reset();
      // form.setValue('companyName', 'yeet');
    }
  }, [open]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const payload = {
      companyName: data.companyName,
      position: data.position,
      status: 'Applied',
      dateApplied: new Date().toISOString()
    };

    try {
      setloading(true);
      await addApplication(payload);
      await refresh();
      showMessage('Successfully added!', 'success');
      setOpen(false);
    } catch (error) {
      handle(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

        <Form {...form}>
          <form className="flex flex-col gap-[16px]">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-[100px]">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)} className="w-[100px]">
            {loading ? <Loader2Icon /> : <p>Add</p>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}