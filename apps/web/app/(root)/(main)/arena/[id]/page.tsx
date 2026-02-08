import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { ArenaLayout } from "../../../../../components/arena/arena-layout"
import { getProblemPrettified, getProblemsList, getSpecificProblem, getUser } from "../../../../../lib/utils";

export default async function ArenaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const [getProblem, problemsList, userRes] = await Promise.all([
    getSpecificProblem(id).then(r => r.data),
    getProblemsList(id),
    getUser(cookieStore),
  ]);
  const problem = getProblemPrettified(getProblem);


  if (!problem) {
    notFound()
  }

  return <ArenaLayout problem={problem} problemIdList={problemsList.problems} index={problemsList.index} user={userRes.data.user} />
}

