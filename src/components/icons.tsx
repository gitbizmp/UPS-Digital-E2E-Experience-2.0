import type { SVGProps } from "react";

/**
 * Material-Symbols-style inline icons used across the portal.
 * Each icon inherits `currentColor` so it can be tinted via CSS.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };
export type { IconProps };

function Base({
  size = 20,
  viewBox = "0 0 24 24",
  children,
  ...rest
}: IconProps & { viewBox?: string; children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Base>
);

export const DashboardIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M3 9h18M9 9v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const OrdersIcon = (p: IconProps) => (
  <Base {...p} viewBox="0 0 16 13.667">
    <path
      d="M14.7852 0.0107422C15.0545 0.059263 15.2728 0.270566 15.3232 0.547852L15.9893 4.21484C15.9963 4.25395 16 4.29425 16 4.33398C15.9999 5.1057 15.7555 5.84349 15.334 6.42773V13C15.3338 13.3679 15.0349 13.6668 14.667 13.667H12.958C12.5899 13.667 12.2912 13.368 12.291 13V9.77246H10.5469V13C10.5467 13.3679 10.2487 13.6667 9.88086 13.667H1.33398C0.965904 13.667 0.667169 13.368 0.666992 13V6.42773C0.245358 5.84346 0.000137959 5.10577 0 4.33398C0 4.29424 0.00367647 4.25396 0.0107422 4.21484L0.677734 0.547852C0.73537 0.230858 1.01179 0 1.33398 0H14.667L14.7852 0.0107422ZM10.6328 6.37695C10.023 7.16143 9.07052 7.66688 8 7.66699C6.92948 7.66689 5.97699 7.16142 5.36719 6.37695C4.83169 7.14817 3.9944 7.66686 3 7.66699C2.64454 7.66695 2.30894 7.59965 2 7.47949V12.334H9.21387V9.10547C9.21393 8.73733 9.51271 8.43848 9.88086 8.43848H12.958C13.3258 8.4389 13.624 8.7376 13.624 9.10547V12.334H14V7.47949C13.6911 7.59962 13.3554 7.66695 13 7.66699C12.0056 7.66688 11.1683 7.14816 10.6328 6.37695ZM7.33398 8.33398C7.70175 8.33436 7.99982 8.63219 8 9V11C7.99982 11.3678 7.70175 11.6666 7.33398 11.667H4C3.63207 11.6668 3.33416 11.3679 3.33398 11V9C3.33416 8.63207 3.63207 8.33416 4 8.33398H7.33398ZM4.66699 10.334H6.66699V9.66699H4.66699V10.334ZM1.33594 4.38281C1.35849 5.54648 2.17216 6.33378 3 6.33398C3.83936 6.33375 4.66669 5.52443 4.66699 4.33398C4.66699 3.96579 4.96579 3.66699 5.33398 3.66699C5.70185 3.66737 6 3.96603 6 4.33398C6.00035 5.43815 6.8958 6.33381 8 6.33398C9.10418 6.33378 9.99965 5.43813 10 4.33398C10 3.96579 10.2988 3.66699 10.667 3.66699C11.035 3.66719 11.334 3.96592 11.334 4.33398C11.3343 5.52445 12.1606 6.33378 13 6.33398C13.8281 6.33375 14.642 5.54602 14.6641 4.38184L14.1104 1.33398H1.88965L1.33594 4.38281Z"
      fill="currentColor"
    />
  </Base>
);

export const ShipmentsIcon = (p: IconProps) => (
  <Base {...p} viewBox="0 0 13.25 14.6353">
    <path
      d="M9.625 5.55697L3.625 2.09697M0.805 3.9303L6.625 7.29697L12.445 3.9303M6.625 14.0103V7.2903M12.625 9.95697V4.62363C12.6248 4.38982 12.563 4.16017 12.446 3.95774C12.329 3.75531 12.1608 3.58721 11.9583 3.4703L7.29167 0.803633C7.08898 0.686608 6.85905 0.625 6.625 0.625C6.39095 0.625 6.16103 0.686608 5.95833 0.803633L1.29167 3.4703C1.08918 3.58721 0.920987 3.75531 0.803975 3.95774C0.686962 4.16017 0.62524 4.38982 0.625 4.62363V9.95697C0.62524 10.1908 0.686962 10.4204 0.803975 10.6229C0.920987 10.8253 1.08918 10.9934 1.29167 11.1103L5.95833 13.777C6.16103 13.894 6.39095 13.9556 6.625 13.9556C6.85905 13.9556 7.08898 13.894 7.29167 13.777L11.9583 11.1103C12.1608 10.9934 12.329 10.8253 12.446 10.6229C12.563 10.4204 12.6248 10.1908 12.625 9.95697Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Base>
);

export const TrackingIcon = (p: IconProps) => (
  <Base {...p} viewBox="0 0 12 12">
    <path
      d="M10.6667 8.12V2.66667C10.6667 1.19333 9.47334 0 8 0C6.52667 0 5.33333 1.19333 5.33333 2.66667V9.33334C5.33333 10.0667 4.73333 10.6667 4 10.6667C3.26667 10.6667 2.66667 10.0667 2.66667 9.33334V3.88C3.44 3.6 4 2.86667 4 2C4 0.893334 3.10667 0 2 0C0.893334 0 0 0.893334 0 2C0 2.86667 0.56 3.6 1.33333 3.88V9.33334C1.33333 10.8067 2.52667 12 4 12C5.47333 12 6.66667 10.8067 6.66667 9.33334V2.66667C6.66667 1.93333 7.26667 1.33333 8 1.33333C8.73334 1.33333 9.33334 1.93333 9.33334 2.66667V8.12C8.56 8.39334 8 9.12667 8 10C8 11.1067 8.89334 12 10 12C11.1067 12 12 11.1067 12 10C12 9.13334 11.44 8.4 10.6667 8.12ZM2 2.66667C1.63333 2.66667 1.33333 2.36667 1.33333 2C1.33333 1.63333 1.63333 1.33333 2 1.33333C2.36667 1.33333 2.66667 1.63333 2.66667 2C2.66667 2.36667 2.36667 2.66667 2 2.66667ZM10 10.6667C9.63334 10.6667 9.33334 10.3667 9.33334 10C9.33334 9.63334 9.63334 9.33334 10 9.33334C10.3667 9.33334 10.6667 9.63334 10.6667 10C10.6667 10.3667 10.3667 10.6667 10 10.6667Z"
      fill="currentColor"
    />
  </Base>
);

export const ResolutionsIcon = (p: IconProps) => (
  <Base {...p} viewBox="0 0 13.3333 12">
    <path
      d="M12.6667 6.14667C12.6667 2.48667 9.82667 0 6.66667 0C3.54 0 0.666667 2.43333 0.666667 6.18667C0.266667 6.41333 0 6.84 0 7.33333V8.66667C0 9.4 0.6 10 1.33333 10H2V5.93333C2 3.35333 4.08667 1.26667 6.66667 1.26667C9.24667 1.26667 11.3333 3.35333 11.3333 5.93333V10.6667H6V12H11.3333C12.0667 12 12.6667 11.4 12.6667 10.6667V9.85334C13.06 9.64667 13.3333 9.24 13.3333 8.76V7.22667C13.3333 6.76 13.06 6.35333 12.6667 6.14667Z"
      fill="currentColor"
    />
    <path
      d="M4.66667 7.33333C5.03486 7.33333 5.33333 7.03486 5.33333 6.66667C5.33333 6.29848 5.03486 6 4.66667 6C4.29848 6 4 6.29848 4 6.66667C4 7.03486 4.29848 7.33333 4.66667 7.33333Z"
      fill="currentColor"
    />
    <path
      d="M8.66667 7.33333C9.03486 7.33333 9.33334 7.03486 9.33334 6.66667C9.33334 6.29848 9.03486 6 8.66667 6C8.29848 6 8 6.29848 8 6.66667C8 7.03486 8.29848 7.33333 8.66667 7.33333Z"
      fill="currentColor"
    />
    <path
      d="M10.6667 5.35333C10.3467 3.45333 8.69334 2 6.7 2C4.68 2 2.50667 3.67333 2.68 6.3C4.32667 5.62667 5.56667 4.16 5.92 2.37333C6.79334 4.12667 8.58667 5.33333 10.6667 5.35333Z"
      fill="currentColor"
    />
  </Base>
);

export const ClaimsIcon = (p: IconProps) => (
  <Base {...p} viewBox="0 0 11.917 14.583">
    <path
      d="M7.41406 0.0117188C7.53402 0.0357123 7.64556 0.0949068 7.7334 0.182617L11.7334 4.18262C11.8505 4.29975 11.9169 4.45936 11.917 4.625V12.625C11.917 13.1442 11.7098 13.6425 11.3428 14.0098C10.9756 14.3768 10.4772 14.5829 9.95801 14.583H1.95801C1.43874 14.5829 0.940424 14.3769 0.573242 14.0098C0.206087 13.6425 0 13.1443 0 12.625V1.95801C0.000172405 1.43886 0.206137 0.940347 0.573242 0.573242C0.940393 0.206264 1.4389 8.62373e-05 1.95801 0H7.29199L7.41406 0.0117188ZM1.95801 1.25C1.77042 1.25009 1.58976 1.32447 1.45703 1.45703C1.32435 1.58972 1.25017 1.77038 1.25 1.95801V12.625C1.25 12.8128 1.3243 12.9932 1.45703 13.126C1.58979 13.2587 1.77026 13.3329 1.95801 13.333H9.95801C10.1457 13.3329 10.3262 13.2586 10.459 13.126C10.5916 12.9932 10.667 12.8127 10.667 12.625V5.24512C10.6528 5.24608 10.6384 5.25 10.624 5.25H7.29102C6.94599 5.24982 6.66602 4.97007 6.66602 4.625V1.29199C6.66602 1.27783 6.66899 1.26393 6.66992 1.25H1.95801ZM8.62402 10C8.96909 10 9.24885 10.28 9.24902 10.625C9.24902 10.9702 8.9692 11.25 8.62402 11.25H3.29102C2.94599 11.2498 2.66602 10.9701 2.66602 10.625C2.66619 10.2801 2.9461 10.0002 3.29102 10H8.62402ZM8.62402 7.33398C8.9692 7.33398 9.24902 7.61381 9.24902 7.95898C9.24885 8.30401 8.96909 8.58398 8.62402 8.58398H3.29102C2.9461 8.58381 2.66619 8.3039 2.66602 7.95898C2.66602 7.61392 2.94599 7.33416 3.29102 7.33398H8.62402ZM4.62402 4.66699C4.9692 4.66699 5.24902 4.94681 5.24902 5.29199C5.24902 5.63717 4.9692 5.91699 4.62402 5.91699H3.29102C2.94599 5.91682 2.66602 5.63706 2.66602 5.29199C2.66602 4.94692 2.94599 4.66717 3.29102 4.66699H4.62402ZM7.91602 4H9.78223L7.91602 2.13379V4Z"
      fill="currentColor"
    />
  </Base>
);

export const HelpIcon = (p: IconProps) => (
  <Base {...p} viewBox="0 0 13 13">
    <path
      d="M7.25 9.75C7.25 9.89834 7.20602 10.0433 7.12361 10.1667C7.0412 10.29 6.92406 10.3861 6.78702 10.4429C6.64997 10.4997 6.49917 10.5145 6.35369 10.4856C6.2082 10.4567 6.07456 10.3852 5.96967 10.2803C5.86478 10.1754 5.79335 10.0418 5.76442 9.89632C5.73548 9.75083 5.75033 9.60003 5.80709 9.46299C5.86386 9.32595 5.95999 9.20881 6.08333 9.1264C6.20666 9.04399 6.35167 9 6.5 9C6.69892 9 6.88968 9.07902 7.03033 9.21967C7.17099 9.36032 7.25 9.55109 7.25 9.75ZM6.5 3C5.12125 3 4 4.00938 4 5.25V5.5C4 5.63261 4.05268 5.75979 4.14645 5.85355C4.24022 5.94732 4.3674 6 4.5 6C4.63261 6 4.75979 5.94732 4.85356 5.85355C4.94733 5.75979 5 5.63261 5 5.5V5.25C5 4.5625 5.67313 4 6.5 4C7.32688 4 8 4.5625 8 5.25C8 5.9375 7.32688 6.5 6.5 6.5C6.3674 6.5 6.24022 6.55268 6.14645 6.64645C6.05268 6.74022 6 6.86739 6 7V7.5C6 7.63261 6.05268 7.75979 6.14645 7.85356C6.24022 7.94732 6.3674 8 6.5 8C6.63261 8 6.75979 7.94732 6.85356 7.85356C6.94733 7.75979 7 7.63261 7 7.5V7.455C8.14 7.24563 9.00001 6.33625 9.00001 5.25C9.00001 4.00938 7.87875 3 6.5 3ZM13 6.5C13 7.78558 12.6188 9.04229 11.9046 10.1112C11.1903 11.1801 10.1752 12.0132 8.98745 12.5052C7.79973 12.9972 6.49279 13.1259 5.23192 12.8751C3.97104 12.6243 2.81285 12.0052 1.90381 11.0962C0.994768 10.1872 0.375703 9.02897 0.124899 7.76809C-0.125905 6.50721 0.00281635 5.20028 0.494786 4.01256C0.986756 2.82484 1.81988 1.80968 2.8888 1.09545C3.95772 0.381218 5.21443 0 6.5 0C8.22335 0.00181989 9.8756 0.687224 11.0942 1.90582C12.3128 3.12441 12.9982 4.77665 13 6.5ZM12 6.5C12 5.4122 11.6774 4.34883 11.0731 3.44436C10.4687 2.53989 9.60976 1.83494 8.60476 1.41866C7.59977 1.00238 6.4939 0.893462 5.42701 1.10568C4.36011 1.3179 3.38011 1.84172 2.61092 2.61091C1.84173 3.3801 1.3179 4.36011 1.10568 5.427C0.893465 6.4939 1.00238 7.59977 1.41867 8.60476C1.83495 9.60976 2.5399 10.4687 3.44437 11.0731C4.34884 11.6774 5.41221 12 6.5 12C7.95819 11.9983 9.35617 11.4184 10.3873 10.3873C11.4184 9.35617 11.9984 7.95818 12 6.5Z"
      fill="currentColor"
    />
  </Base>
);

export const ChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const ChevronRight = (p: IconProps) => (
  <Base {...p}>
    <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const ChevronLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const CodeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m8 6-6 6 6 6M16 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const BellIcon = (p: IconProps) => (
  <Base {...p}>
    <path
      d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5 2 6H4c.5-1 2-2 2-6Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </Base>
);

export const AppsIcon = (p: IconProps) => (
  <Base {...p}>
    {[4, 10, 16].map((y) =>
      [4, 10, 16].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="currentColor" />)
    )}
  </Base>
);

export const CallMadeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const TrendingUpIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m4 15 5-5 4 4 6-7M15 6h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const LightbulbIcon = (p: IconProps) => (
  <Base {...p}>
    <path
      d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.4 1 2.5h6c0-1.1.3-1.8 1-2.5A6 6 0 0 0 12 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Base>
);

export const AssignmentIcon = (p: IconProps) => (
  <Base {...p}>
    <path
      d="M6 4h12v17H6V4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M9 4a3 3 0 0 1 6 0M9 11h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const ArrowRightAltIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const OpenInNewIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 5h5v5M19 5l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 14v5H5V6h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const CheckCircleIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="m8.5 12 2.2 2.2L15.5 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const PlusIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </Base>
);

export const ShieldIcon = (p: IconProps) => (
  <Base {...p}>
    <path
      d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </Base>
);

export const GlobeIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </Base>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path
      d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Z"
      fill="currentColor"
    />
    <path d="m8.6 11.8 2.3 2.3 4.5-4.6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const TrendingDownIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m4 9 5 5 4-4 6 7M15 18h5v-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const SearchIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
    <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Base>
);

export const FilterIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Base>
);

export const LockIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="15" r="1.3" fill="currentColor" />
  </Base>
);

export const SettingsIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M19.4 12a7.73 7.73 0 0 0-.08-1l2.08-1.62-2-3.46-2.5 1a7.6 7.6 0 0 0-1.74-1l-.38-2.66h-4l-.38 2.66a7.6 7.6 0 0 0-1.74 1l-2.5-1-2 3.46L4.68 11a8 8 0 0 0 0 2l-2.08 1.62 2 3.46 2.5-1c.53.42 1.12.77 1.74 1l.38 2.66h4l.38-2.66c.62-.23 1.21-.58 1.74-1l2.5 1 2-3.46L19.32 13c.05-.33.08-.66.08-1Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </Base>
);

export const DownloadIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const MoreVertIcon = (p: IconProps) => (
  <Base {...p}>
    {[6, 12, 18].map((cy) => (
      <circle key={cy} cx="12" cy={cy} r="1.6" fill="currentColor" />
    ))}
  </Base>
);

export const UnfoldMoreIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m8 9 4-4 4 4M8 15l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const PaymentIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
  </Base>
);

export const AccountBoxIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.5 17c.8-2 2.4-3 4.5-3s3.7 1 4.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </Base>
);

export const ChatIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 5h14v10H9l-4 4V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </Base>
);

export const PhotoIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="9" cy="10" r="1.6" fill="currentColor" />
    <path d="m5 17 5-4 3 2 3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const SendIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12 20 4l-6 16-3-7-7-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="currentColor" />
  </Base>
);

export const GridIcon = (p: IconProps) => (
  <Base {...p}>
    <path
      d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </Base>
);

export const TableIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 9.5h17M3.5 14.5h17M9 9.5v10" stroke="currentColor" strokeWidth="1.6" />
  </Base>
);

export const LabelIcon = (p: IconProps) => (
  <Base {...p}>
    <path
      d="M4 6.5A1.5 1.5 0 0 1 5.5 5h7.9a1.5 1.5 0 0 1 1.14.53l4.03 4.75a1.5 1.5 0 0 1 0 1.94l-4.03 4.75a1.5 1.5 0 0 1-1.14.53H5.5A1.5 1.5 0 0 1 4 16.5v-10Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="11.5" r="1.4" fill="currentColor" />
  </Base>
);

export const PackageIcon = (p: IconProps) => (
  <Base {...p}>
    <path
      d="M12 3 4 7v10l8 4 8-4V7l-8-4Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M4 7l8 4 8-4M12 11v10M8 5l8 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </Base>
);

export const BrokenPackageIcon = (p: IconProps) => (
  <Base {...p}>
    <path
      d="M12 3 4 7v10l8 4 8-4V7l-8-4Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M9 8l2 3-2 2 3 2-1 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const StarIcon = (p: IconProps) => (
  <Base {...p}>
    <path
      d="M12 3.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.77 6.8 19.5l.99-5.79-4.21-4.1 5.82-.85L12 3.5Z"
      fill="currentColor"
    />
  </Base>
);

export const AccountCircleIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M6.5 18.5c1.2-2.2 3.2-3.3 5.5-3.3s4.3 1.1 5.5 3.3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </Base>
);

export const AccountBalanceIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 10h16M5 10 12 4l7 6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M6 10v7M10 10v7M14 10v7M18 10v7M4 20h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Base>
);

export const CheckbookIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M6 10h6M6 13h4M15 14.5l1.5 1.5 2.5-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const DeleteIcon = (p: IconProps) => (
  <Base {...p}>
    <path
      d="M5 7h14M10 4h4M9 7l.7 12a1 1 0 0 0 1 1h2.6a1 1 0 0 0 1-1L15 7M10 11v6M14 11v6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Base>
);

export const InfoIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </Base>
);

export const UploadIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 16V5m0 0-4 4m4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Base>
);

export const PaymentArrowDownIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 11.5v3m0 0-1.5-1.5M12 14.5l1.5-1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const ConversionPathIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="5" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="19" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M7.4 6H14a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3h-4a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Base>
);

export const WarningTriangleIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.2 1.6 21h20.8L12 3.2Z" fill="currentColor" />
    <path d="M12 9.5v4.2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1.05" fill="#fff" />
  </Base>
);

/* ── Real payment-brand card marks (fixed color, 32×20 card) ── */
function CardBase({ size = 20, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={(size / 20) * 32}
      height={size}
      viewBox="0 0 32 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const VisaCardIcon = (p: IconProps) => (
  <CardBase {...p}>
    <rect width="32" height="20" rx="3" fill="#1434CB" />
    <text
      x="16"
      y="14"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="9"
      fontStyle="italic"
      fontWeight="700"
      letterSpacing="0.5"
      fill="#fff"
    >
      VISA
    </text>
  </CardBase>
);

export const MastercardCardIcon = (p: IconProps) => (
  <CardBase {...p}>
    <rect width="32" height="20" rx="3" fill="#1A1A2E" />
    <circle cx="13" cy="10" r="6" fill="#EB001B" />
    <circle cx="19" cy="10" r="6" fill="#F79E1B" />
    <path
      d="M16 5.3a6 6 0 0 1 0 9.4 6 6 0 0 1 0-9.4Z"
      fill="#FF5F00"
    />
  </CardBase>
);

export const AmexCardIcon = (p: IconProps) => (
  <CardBase {...p}>
    <rect width="32" height="20" rx="3" fill="#016FD0" />
    <text
      x="16"
      y="13"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="7"
      fontWeight="700"
      letterSpacing="0.3"
      fill="#fff"
    >
      AMEX
    </text>
  </CardBase>
);

