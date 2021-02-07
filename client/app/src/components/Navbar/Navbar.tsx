import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Grid,
  Container,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  ExitToApp as ExitToAppIcon,
  PersonOutline as PersonOutlineIcon,
} from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import useUser from 'src/hooks/useUser';
import useAuthenticator from 'src/hooks/useAuthenticator';
import { rhythm } from 'src/utils';

const Topbar = styled(AppBar)`
  color: var(--lightest-slate) !important;
  background-color: var(--navy) !important;
  backdrop-filter: blur(10px);
  pointer-events: auto !important;
  user-select: auto !important;
`;
const ContentRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Logo = styled.img`
  object-fit: cover;
  object-position: center center;
  width: 64px;
  height: 64px;
  margin-bottom: 0;
`;

const ProfileImg = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 100%;
  margin-bottom: 0px;
  margin-left: ${rhythm(2)};
`;

const DisplayName = styled.span`
  margin-left: ${rhythm(0.5)};
  color: var(--lightest-slate);
`;

const Ol = styled.ol`
  padding: 0px;
  margin: 0px;
  list-style: none;
`;

const Li = styled.li`
  margin: 0px 5px;
  position: relative;
  color: var(--lightest-slate) !important;
`;

const Link = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  text-decoration-skip-ink: auto;
  color: inherit;
  position: relative;
  counter-increment: item 1;
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: var(--green);
  }
  &:before {
    content: '0' counter(item) '.';
    margin-right: 5px;
    color: var(--green);
    text-align: right;
  }
`;
export function Navbar() {
  const { data, mutate } = useUser();
  const authenticate = useAuthenticator();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogOut() {
    authenticate.LogOut();
    mutate(() => {
      return { display_name: '', picture_url: '' };
    });
  }

  return (
    <Topbar elevation={0}>
      <Container maxWidth="xl">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item lg={6} md={6}>
              <div>
                <Logo
                  src={'/logo64x64.png'}
                  loading="lazy"
                  alt="GodKoz Money Book"
                />
              </div>
            </Grid>
            <Grid item lg={6} md={6}>
              <ContentRight>
                <Ol>
                  <Li>
                    <Link to="/">ภาพรวม</Link>
                    <Link to="/expense">รายรับรายจ่าย</Link>
                  </Li>
                </Ol>
                <ProfileImg src={data?.picture_url} loading="lazy" />
                <DisplayName>{data?.display_name}</DisplayName>
                <IconButton
                  size="medium"
                  aria-label="more"
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  color="primary"
                >
                  <ExpandMoreIcon />
                </IconButton>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      console.log('แก้ไขโปรไฟล์');
                    }}
                  >
                    <ListItemIcon>
                      <PersonOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    แก้ไขโปรไฟล์
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    ออกจากระบบ
                  </MenuItem>
                </Menu>
              </ContentRight>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </Topbar>
  );
}

export default Navbar;
