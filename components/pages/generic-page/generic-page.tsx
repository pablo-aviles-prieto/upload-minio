import { HEADER_HEIGHT } from '@/utils/const';

interface GenericPageProps {
  text: string;
}

export const GenericPage = ({ text }: GenericPageProps) => {
  return (
    <div
      className={`flex flex-col gap-y-4 items-center justify-center px-2`}
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT} * 2)` }}
    >
      <p className='text-6xl'>🥺</p>
      <p>{text}</p>
    </div>
  );
};
