import { db } from '~/lib/db';

const getRepoMetadata = async (taskId: string) => {
  const repo = await db.repo.findUnique({
    where: {
      taskId,
    },
  });

  const meta = await fetch(`https://api.github.com/repos/${repo?.fullName}`);
  const json = await meta.json();
  return json;
};

export default async function RepoMetaPage({
  params,
}: {
  params: { username: string; taskId: string } | Promise<{ username: string; taskId: string }>;
}) {
  // "Awaitujemy" params, aby dostać zwykły obiekt
  const resolvedParams = await params;
  const meta = await getRepoMetadata(resolvedParams.taskId);

  return <pre>{JSON.stringify(meta, null, 2)}</pre>;
}
