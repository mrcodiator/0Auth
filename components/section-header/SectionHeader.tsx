import React from 'react'
import { Separator } from '../ui/separator';

type Alignment = 'left' | 'center' | 'right';

interface SectionHeaderProps {
    title: string;
    description?: any;
    alignment?: Alignment;
}

const SectionHeader = ({ title, description, alignment = 'left' }: SectionHeaderProps) => {
    const alignmentClass = alignment === 'left' ? '' : `text-${alignment}`;

    return (
        <div className={`flex flex-col py-3 space-y-2 ${alignmentClass}`}>
            <h1 className="text-xl font-semibold text-foreground md:text-3xl">{title}</h1>
            <Separator className="w-[30px] h-[5px] bg-primary" />
            <p className="text-sm text-muted-foreground md:text-base">{description}</p>
        </div>
    )
}

export default SectionHeader

