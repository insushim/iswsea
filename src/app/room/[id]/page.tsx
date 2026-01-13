import { rooms } from "@/data/pension";
import RoomDetailClient from "./RoomDetailClient";

// 정적 빌드를 위한 모든 객실 ID 생성
export function generateStaticParams() {
  return rooms.map((room) => ({
    id: room.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <RoomDetailClient roomId={id} />;
}
