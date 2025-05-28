"use client";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface SecondarySidebarProps {
    type: 'case' | 'folder';
    name: string;
    actions?: {
        label: string;
        icon: string;
        onClick: () => void;
    }[];
}

export default function SecondarySidebar({ type, name, actions = [] }: SecondarySidebarProps) {
    const router = useRouter();

    const defaultActions = [
        {
            label: 'Info',
            icon: 'ℹ️',
            onClick: () => { }
        },
        {
            label: 'Edit',
            icon: '✏️',
            onClick: () => { }
        },
        {
            label: 'Share',
            icon: '🔗',
            onClick: () => { }
        },
        {
            label: 'Delete',
            icon: '🗑️',
            onClick: () => { }
        }
    ];

    const allActions = [...defaultActions, ...actions];

    return (
        <div className="absolute  left-64 right-0 bg-white border-b border-gray-200 z-10">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <span className="text-xl">
                            {type === 'case' ? '📄' : '📂'}
                        </span>
                        <h2 className="text-lg font-semibold">{name}</h2>
                    </div>

                    <div className="flex items-center space-x-2">
                        {allActions.map((action, index) => (
                            <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                onClick={action.onClick}
                                className="flex items-center space-x-1"
                            >
                                <span>{action.icon}</span>
                                <span>{action.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex items-center space-x-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2"
                    >
                        <span>📎</span>
                        <span>Add to AMICUS</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2"
                    >
                        <span>📤</span>
                        <span>Upload Document</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
