import { useState } from "react";
import { ChevronRight, CheckIcon } from "./icons";
import ConnectStorePanel from "./ConnectStorePanel";
import CommerceShieldSetupPanel from "./CommerceShieldSetupPanel";
import "./Dashboard.css";

/* -------------------------------- Onboarding card ------------------------------- */
type OnboardingTask = {
  id: string;
  title: string;
  desc: string;
  cta: string;
  status: "complete" | "active" | "pending";
};

const onboardingTasks: OnboardingTask[] = [
  {
    id: "commerceshield",
    title: "Set up CommerceShield",
    desc: "Turn on real-time fraud scoring and chargeback protection for your orders.",
    cta: "Set Up",
    status: "active",
  },
  {
    id: "ecommerce",
    title: "Connect e-Commerce",
    desc: "Connect orders from your e-commerce and sales channels platforms.",
    cta: "Connect",
    status: "pending",
  },
];

function TaskDot({ status }: { status: OnboardingTask["status"] }) {
  if (status === "complete") {
    return (
      <span className="task-dot task-dot--done" aria-hidden>
        <CheckIcon size={11} />
      </span>
    );
  }
  return <span className="task-dot task-dot--pending" aria-hidden />;
}

function OnboardingCard({
  statuses,
  onConnect,
  onCommerceShield,
}: {
  statuses: Record<string, OnboardingTask["status"]>;
  onConnect: () => void;
  onCommerceShield: () => void;
}) {
  const tasks = onboardingTasks.map((t) => ({ ...t, status: statuses[t.id] ?? t.status }));
  const done = tasks.filter((t) => t.status === "complete").length;

  const handlers: Record<string, () => void> = {
    ecommerce: onConnect,
    commerceshield: onCommerceShield,
  };

  return (
    <section className="onboarding">
      <p className="onboarding__lead">
        Welcome, Alex! Here’s what we recommend you do next to get the most from your experience.
      </p>

      <div className="onboarding__panel">
        <div className="onboarding__progress">
          <span className="onboarding__radio" />
          <span>
            {done} of {tasks.length} tasks complete
          </span>
        </div>

        <p className="onboarding__section">Complete Setup</p>

        <div className="onboarding__tasks">
          {tasks.map((task) =>
            task.status === "active" ? (
              <div className="onboarding__task" key={task.id}>
                <div className="onboarding__task-body">
                  <div className="onboarding__task-head">
                    <TaskDot status={task.status} />
                    <span className="onboarding__task-title">{task.title}</span>
                  </div>
                  <p className="onboarding__task-desc">{task.desc}</p>
                </div>
                <button className="btn btn--primary btn--sm btn--pill" onClick={handlers[task.id]}>
                  {task.cta}
                  <ChevronRight size={14} />
                </button>
              </div>
            ) : (
              <div className="onboarding__step" key={task.id}>
                <TaskDot status={task.status} />
                <span className="onboarding__task-title">{task.title}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Set-up complete handoff ----------------------------- */
function OrdersSkeleton() {
  return (
    <div className="lynk-mock" aria-hidden>
      <div className="lynk-mock__bar">
        <span className="lynk-mock__dot" />
        <span className="lynk-mock__dot" />
        <span className="lynk-mock__dot" />
        <span className="lynk-mock__addr" />
      </div>
      <div className="lynk-mock__body">
        <div className="lynk-mock__main">
          <span className="lynk-mock__crumb" />
          <span className="lynk-mock__h1" />
          <div className="lynk-mock__stats">
            <span className="lynk-mock__stat" />
            <span className="lynk-mock__stat" />
            <span className="lynk-mock__stat" />
          </div>
          <div className="lynk-mock__toolbar">
            <span className="lynk-mock__search" />
            <span className="lynk-mock__btn" />
            <span className="lynk-mock__btn" />
          </div>
          <div className="lynk-mock__table">
            <span className="lynk-mock__row" />
            <span className="lynk-mock__row" />
            <span className="lynk-mock__row" />
            <span className="lynk-mock__row" />
            <span className="lynk-mock__row" />
          </div>
        </div>
        <div className="lynk-mock__detail">
          <span className="lynk-mock__d-title" />
          <span className="lynk-mock__line" />
          <span className="lynk-mock__line lynk-mock__line--short" />
          <span className="lynk-mock__thumb" />
          <span className="lynk-mock__line" />
          <span className="lynk-mock__line lynk-mock__line--short" />
        </div>
      </div>
    </div>
  );
}

function OperateHandoff({ onGoToOperate }: { onGoToOperate?: () => void }) {
  return (
    <section className="lynk-handoff">
      <div className="lynk-handoff__text">
        <span className="lynk-handoff__badge">
          <CheckIcon size={13} />
          You&rsquo;re all set up
        </span>
        <h2 className="lynk-handoff__title">You&rsquo;re ready to go, Alex!</h2>
        <p className="lynk-handoff__lead">
          Your store is connected and CommerceShield is protecting your orders. Head over to
          <strong> Operate</strong> to track shipments, manage orders, and review order risk.
        </p>
        {onGoToOperate && (
          <button className="lynk-handoff__cta" onClick={onGoToOperate}>
            Go to Operate
            <ChevronRight size={16} />
          </button>
        )}
      </div>
      <OrdersSkeleton />
    </section>
  );
}

/* ----------------------------- Self-contained onboarding ----------------------------- */
export default function Onboarding({
  onGoToOperate,
  onCommerceShieldConfigured,
}: {
  onGoToOperate?: () => void;
  onCommerceShieldConfigured?: (plan?: "os" | "eos") => void;
}) {
  const [panel, setPanel] = useState<null | "connect" | "commerceshield">(null);
  const [ecommerceDone, setEcommerceDone] = useState(false);
  const [commerceShieldDone, setCommerceShieldDone] = useState(false);

  const taskStatuses: Record<string, OnboardingTask["status"]> = {
    commerceshield: commerceShieldDone ? "complete" : "active",
    ecommerce: ecommerceDone ? "complete" : commerceShieldDone ? "active" : "pending",
  };

  if (ecommerceDone && commerceShieldDone) {
    return (
      <div className="lynk-complete">
        <div className="lynk-complete__inner">
          <OperateHandoff onGoToOperate={onGoToOperate} />
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-split">
      <div className="onboarding-split__page">
        <OnboardingCard
          statuses={taskStatuses}
          onConnect={() => setPanel("connect")}
          onCommerceShield={() => setPanel("commerceshield")}
        />
      </div>
      <ConnectStorePanel
        open={panel === "connect"}
        onClose={() => setPanel(null)}
        onComplete={() => setEcommerceDone(true)}
      />
      <CommerceShieldSetupPanel
        open={panel === "commerceshield"}
        onClose={() => setPanel(null)}
        onComplete={(plan) => {
          setCommerceShieldDone(true);
          onCommerceShieldConfigured?.(plan);
        }}
      />
    </div>
  );
}
