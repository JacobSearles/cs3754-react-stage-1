import React, { useState } from 'react';

/* props.children is a reference to the child elements of this components, e.g. what's
 * inside
 * <TabChooser>
 *   <Child1 .. />
 *   <Child2 .. />
 * </TabChooser>
 */
const TabChooser = ({ children }) => {
  const [currentTab, selectTab] = useState(0); // currently selected tab by index
  const [currentTabSpinning, makeCurrentTabSpinning] = useState(false); // display spinner or not
  const selectedTab = children[currentTab]; // react element corresponding to selected tab
  return (
    <>
      <ul id="menu">
        {children.map((tab, i) => (
          <li onClick={() => selectTab(i)} key={tab.props.label}>
            {tab.props.label}
          </li>
        ))}
      </ul>
      <div className={`tab ${currentTabSpinning ? "spinner" : ""}`}>
        {/* Since the element is already created when passed as a child, we
            can't just add a property.  React.cloneElement allows us to add
            a property 'showSpinner' that allows the embedded tab component
            to turn the spinner off and on.
         */}
        {React.cloneElement(selectedTab, { showSpinner: makeCurrentTabSpinning })}
      </div>
    </>
  );
};

export default TabChooser;
