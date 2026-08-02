import type { Activity } from '../../../../mock/activities';

export interface ActivitiesCardProps {
    openCard: string | null;
    setOpenCard: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ActivityDetailsProps {
    card: Activity;
}

export interface ActivityItemProps {
    card: Activity;
    isOpen: boolean;
    setOpenCard: React.Dispatch<React.SetStateAction<string | null>>;
}