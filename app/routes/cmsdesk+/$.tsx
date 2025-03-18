import HandsomeError from '~/components/HandsomeError';

export const loader = async () => {
  throw new Response(null, { status: 404, statusText: 'Not found' });
};

export const ErrorBoundary = () => <HandsomeError basePath='/cmsdesk' />;

export default function NotFound() {
  return <HandsomeError basePath='/cmsdesk' />;
}
