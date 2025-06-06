'use client';

import React, { useEffect, useState } from 'react';
import { handle } from '@/api/api-utils';
import { showMessage } from '@/components/dialog/Alert';
import { updateApplication, getApplication } from '@/api/applications';

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
  DialogTitle
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

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
  refresh
}: EditApplicationDialogProps) {
  const [loading, setloading] = useState(false);
  const [status, setStatus] = useState('');
  const [dateApplied, setDateApplied] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: '',
      position: ''
    }
  });

  useEffect(() => {
    async function fetchData(id: string) {
      await getApplication(id).then(({ data }) => {
        form.setValue('companyName', data.companyName);
        form.setValue('position', data.position);
        setStatus(data.status);
        setDateApplied(data.dateApplied);
      });
    }

    if (open) {
      setloading(false);
      if (typeof id === 'number'){
        fetchData(id);
      }
    }
  }, [open]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!id) return;
    const payload = {
      id: id,
      companyName: data.companyName,
      position: data.position,
      status,
      dateApplied
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit application</DialogTitle>
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
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-[100px]">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)} className="w-[100px]">
            {loading ? <Loader2Icon /> : <p>Update</p>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
