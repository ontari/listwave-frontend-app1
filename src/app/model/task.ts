export interface Task {
    isSelected: boolean;
    id: number;
    description: string;
    status: string;
    isEdit: boolean;
}


export const TaskColumns = [
    {
        key: 'isSelected',
        type: 'isSelected',
        label: '',
    },
    {
        key: 'id',
        type: 'id',
        label: 'ID',
    },
    {
        key: 'description',
        type: 'text',
        label: 'Description',
    },
    {
        key: 'status',
        type: 'text',
        label: 'Status',
    },
    {
        key: 'isEdit',
        type: 'isEdit',
        label: '',
    },
];