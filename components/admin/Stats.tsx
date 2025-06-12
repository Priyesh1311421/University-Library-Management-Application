import { Triangle } from "lucide-react";

interface Stat {
  title: string;
  count: number;
  change?: number;
}

const Stats = ({ title, count, change = 0 }: Stat) => {
  const isPositive = change >= 0 ;
  change = Math.abs(change);
  return (
    <div className="stat">
      <div className="flex flex-col gap-2">
        <div className="stat-label flex justify-between">
            <div>
                {title}
            </div>
            <div>
                {isPositive ? (
                    <span className="gap-1 text-green-600 flex items-center justify-center">
                        <Triangle fill="#16a34a" className=" h-4 w-4 " />
                        <p>{change}</p>
                    </span>
                ) : (
                    <span className="gap-1 flex text-red-600 ">
                        <Triangle fill="#dc2626" className="h-4 w-4 rotate-180" />
                        <p>{change}</p>
                    </span>
                )}
            </div>
        </div>
        <div className="stat-count flex items-baseline gap-2 text-xl font-semibold">
          <span>{count}</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
