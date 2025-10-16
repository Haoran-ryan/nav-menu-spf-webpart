// This describes what ONE menu item looks like
export interface INavigationItem {
  name: string; // "Student Portal"
  url: string; // "https://..."
  key: string; // "studentPortal"
  icon: string; // "Home"
}

// This describes what ONE group looks like
export interface INavigationGroup {
  name: string; // "Course Links"
  items: INavigationItem[]; // Array of items
}

// This describes the entire data structure
export interface INavigationData {
  groups: INavigationGroup[]; // Array of groups
}
