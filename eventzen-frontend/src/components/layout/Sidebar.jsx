import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Event as EventIcon,
  Place as VenueIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Sidebar({ open, setOpen }) {
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar /> {/* Spacer for AppBar */}
      <Divider />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/events">
          <ListItemIcon><EventIcon /></ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>
        <ListItem button component={Link} to="/venues">
          <ListItemIcon><VenueIcon /></ListItemIcon>
          <ListItemText primary="Venues" />
        </ListItem>
      </List>
    </Drawer>
  );
}