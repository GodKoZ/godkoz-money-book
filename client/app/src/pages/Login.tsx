import React, { useEffect } from 'react';
import { Card } from 'src/components/ui';
import { CardContent, Button, Grid, Icon } from '@material-ui/core';
import styled from '@emotion/styled';
import { scale, rhythm } from 'src/utils/typography';
import useAuthenticator from 'src/hooks/useAuthenticator';

const Center = styled.div`
  display: grid;
  place-content: center;
  height: 100vh;
`;

const LogInButton = styled(Button)`
  width: 250px !important;
  background-color: #fff !important;
  color: #000 !important;
  text-align: left !important;
  justify-content: flex-start !important;
`;

export default function Login() {
  useEffect(() => {
    document.title = 'Login | Godkoz Money Book';
  }, []);

  const authenticate = useAuthenticator();

  return (
    <Center>
      <Card>
        <CardContent style={{ width: '450px' }}>
          <div
            style={{
              display: 'grid',
              placeContent: 'center',
              margin: `${rhythm(0.5)} 0px`,
              width: '100%',
            }}
          >
            <img
              src={'/logo128x128.png'}
              loading="lazy"
              alt="GodKoz Money Book"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
                width: '128px',
                height: '128px',
              }}
            />
          </div>

          <h1 style={{ textAlign: 'center', marginBottom: rhythm(1.5) }}>
            GodKoz Money Book
          </h1>
          <p
            style={{
              ...scale(2 / 6),
              textAlign: 'center',
              color: 'var(--lightest-slate)',
            }}
          >
            เข้าสู่ระบบ
          </p>
          <Grid container spacing={2} style={{ marginBottom: rhythm(2) }}>
            <Grid item lg={12} md={12} style={{ textAlign: 'center' }}>
              <LogInButton
                variant="contained"
                size="large"
                startIcon={
                  <Icon>
                    <img
                      src="/facebook.svg"
                      style={{ height: '100%', width: '100%' }}
                      alt="facebook"
                    />
                  </Icon>
                }
                fullWidth
                onClick={() => authenticate.LogIn('facebook')}
              >
                เข้าสู่ระบบด้วย Facebook
              </LogInButton>
            </Grid>
            <Grid item lg={12} md={12} style={{ textAlign: 'center' }}>
              <LogInButton
                variant="contained"
                size="large"
                startIcon={
                  <Icon>
                    <img
                      src="/line.svg"
                      style={{ height: '100%', width: '100%' }}
                      alt="line"
                    />
                  </Icon>
                }
                fullWidth
                onClick={() => authenticate.LogIn('line')}
              >
                เข้าสู่ระบบด้วย LINE
              </LogInButton>
            </Grid>
            <Grid item lg={12} md={12} style={{ textAlign: 'center' }}>
              <LogInButton
                variant="contained"
                size="large"
                startIcon={
                  <Icon>
                    <img
                      src="/google.svg"
                      style={{ height: '100%', width: '100%' }}
                      alt="google"
                    />
                  </Icon>
                }
                fullWidth
                onClick={() => authenticate.LogIn('google')}
              >
                เข้าสู่ระบบด้วย Google
              </LogInButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Center>
  );
}
