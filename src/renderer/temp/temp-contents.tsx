// const TempContents = (props: any) => {
//     const tabs: MyTab[] = props.toTabs(props.tabs);

//     return <div className="contents">
//         <C.TabBar>
//             <C.TabLabelsOuter><>{
//                 tabs.map((tab) => {
//                     return <TabLabel 
//                             key={`tab-${tab.key}`}
//                             _key={tab.key}
//                             fileName={tab.fileName}
//                             type={tab.type}
//                             tabIndex={tab.tabIndex}
//                             closeTab={tab.closeTab!.bind(tab)}
//                             updateFileName={tab.updateFileName!.bind(tab)}
//                     />            
//                 })
//             }</></C.TabLabelsOuter>
//         </C.TabBar>        
//         <C.PanesOuter><>{
//             tabs.map((tab) => {
//                 switch (tab.type) {
//                     case 'txt':
//                     default : {
//                         return <PaneText 
//                             key={`pane-${tab.key}`} 
//                             _key={`pane-${tab.key}`} 
//                             data={tab.data}
//                             updateData={tab.updateData!.bind(tab)}
//                         />
//                     }
//                 }
//             })
//         }</></C.PanesOuter>
//     </div>
// }