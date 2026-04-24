
import { getDeviceById } from '../../../actions';
import EditDeviceForm from './EditDeviceForm';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const device = await getDeviceById(params.id);

  if (!device) {
    notFound();
  }

  return <EditDeviceForm device={device} />;
}
