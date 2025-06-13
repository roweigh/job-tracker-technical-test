import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Application } from '@/api/applications';
import { Button } from '@/components/ui/button';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown
} from 'lucide-react';

// Define table columns
export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: 'companyName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Company Name
          {column.getIsSorted() === 'asc' ? (
            <ChevronUp />
          ) :  column.getIsSorted() === 'desc' ? (
            <ChevronDown />
          ) : (
            <ChevronsUpDown />
          )}
        </Button>
      );
    }
  },
  {
    accessorKey: 'position',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Position
          {column.getIsSorted() === 'asc' ? (
            <ChevronUp />
          ) :  column.getIsSorted() === 'desc' ? (
            <ChevronDown />
          ) : (
            <ChevronsUpDown />
          )}
        </Button>
      );
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          {column.getIsSorted() === 'asc' ? (
            <ChevronUp />
          ) :  column.getIsSorted() === 'desc' ? (
            <ChevronDown />
          ) : (
            <ChevronsUpDown />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return <Status status={row.original.status} />;
    }
  },
  {
    accessorKey: 'dateApplied',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date Applied
          {column.getIsSorted() === 'asc' ? (
            <ChevronUp />
          ) :  column.getIsSorted() === 'desc' ? (
            <ChevronDown />
          ) : (
            <ChevronsUpDown />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{generateDateTime(row.original.dateApplied)}</span>;
    }
  },
  {
    accessorKey: 'actions',
    header: 'Actions'
  }
];

// Convert ISO DateTime string to human-readable format
function generateDateTime(dateStr: string) {
  const dateTime = new Date(dateStr);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString('en-NZ', {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit'
  });
  return `${date} ${time}`;
}

// Generate status + colour
function Status({ status }: { status: string }) {
  let className = 'select-none w-[75px] ';
  switch (status) {
    case 'Applied':
      className = className.concat('bg-yellow-500');
      break;
    case 'Interview':
      className = className.concat('bg-blue-400');
      break;
    case 'Rejected':
      className = className.concat('bg-red-400');
      break;
    case 'Offer':
      className = className.concat('bg-green-500');
      break;
    default:
      break;
  }

  return <Badge className={className}>{status}</Badge>;
}
