const SideBar = (props) => {
    return (
        <div className={`d-flex flex-column w-25 sidebar-border-${props.border_direction}`}>
            {props.children}
        </div>
    );
}
 
export default SideBar;