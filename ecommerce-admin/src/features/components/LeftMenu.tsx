import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Inbox, Mail, ShoppingCart, Person, Login } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface LeftMenuProps {
    open: boolean
}

export default function LeftMenu({open}: LeftMenuProps){
    const navigate = useNavigate()
    return (
        <>
            <List>
                {[{
                    name:"Login",
                    path: "/login",
                    icon: <Login />
                },
                {
                    name:"Category",
                    path: "/category",
                    icon: <Inbox />
                },
                {
                    name:"Product",
                    path: "/product",
                    icon: <Mail />
                },
                {
                    name:"Customer",
                    path: "/customer",
                    icon: <Person />
                },
                {
                    name:"Order",
                    path: "/order",
                    icon: <ShoppingCart />
                }]
                .map((item, index) => (
                    <ListItem key={item.name} disablePadding sx={{ display: 'block' }} >
                    <ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        }}
                        onClick={()=>navigate(item.path)}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    )
}