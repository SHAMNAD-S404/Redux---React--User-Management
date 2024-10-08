import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';


const navItems : {name:string,url:string}[] = 
  [
    {name:"Home",url:'/'}, 
    {name:"About",url:'/about'}, 
    {name:"Profile",url:'/profile'},
    {name: "Sign in",url:'/sign-in'} 
  ]

export default function BasicMenu() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{color:'white' , fontWeight:'bold' }}
      >
        ☰
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {navItems.map((item) => (

          <Link to={item.url}>
            <MenuItem key={item.name} onClick={handleClose}>{item.name}</MenuItem>
          </Link>

        ))}
        
        
      </Menu>
    </div>
  );
}
