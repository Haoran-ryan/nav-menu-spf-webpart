import * as React from "react";
import { useState } from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import styles from "./NavigationMenu.module.scss";
import { INavigationGroup } from "../models/INavigationData";
import NavigationItem from "./NavigationItem";

interface INavigationGroupProps {
  group: INavigationGroup; // One group with its items
}

const NavigationGroup: React.FC<INavigationGroupProps> = ({ group }) => {
  // State to track if this group is expanded or collapsed
  // useState returns: [currentValue, functionToUpdateIt]
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Function to toggle expanded/collapsed
  const toggleExpand = (): void => {
    setIsExpanded(!isExpanded); // Flip the boolean
  };

  return (
    <div className={styles.navGroup}>
      {/* Clickable header */}
      <div className={styles.groupHeader} onClick={toggleExpand}>
        <h3 className={styles.groupTitle}>{group.name}</h3>
        {/* Show different icon based on expanded state */}
        <Icon
          iconName={isExpanded ? "ChevronDown" : "ChevronRight"}
          className={styles.chevron}
        />
      </div>

      {/* Only show items if expanded */}
      {isExpanded && (
        <div className={styles.groupItems}>
          {/* Loop through each item and render NavigationItem */}
          {group.items.map((item) => (
            <NavigationItem key={item.key} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigationGroup;
