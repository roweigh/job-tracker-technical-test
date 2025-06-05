import { toast } from 'sonner';

// Helper function to display user feedback messages
export function showMessage(message: string, type: string) {
	switch (type) {
		case 'success':
			toast.success(message, {
				style: {
					color: 'white',
					background: 'limegreen',
				},
			});
			break;
		case 'error':
			toast.error(message, {
				style: {
					color: 'white',
					background: 'orangered',
				},
			});
			break;
		default:
			toast(message, {
				style: {
					color: 'white',
					background: 'teal',
				},
			});
			break;
	}
}
