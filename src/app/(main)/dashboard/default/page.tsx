import { MetricCards } from "./_components/metric-cards";
import { RecentChanges } from "./_components/recent-changes";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <MetricCards />
      <RecentChanges />
    </div>
  );
}
