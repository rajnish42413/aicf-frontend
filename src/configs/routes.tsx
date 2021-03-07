import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Ploader from '@components/loader/PLoader';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const Home = React.lazy(() => import('../screens/home/Home'));
const Register = React.lazy(() => import('../screens/register/index'));
const Checkout = React.lazy(() => import('../screens/order/checkout'));
const PaymentStatus = React.lazy(() => import('../screens/order/status'));
const Confirm = React.lazy(() => import('../screens/register/confirm'));

const publicPaths = [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/new-register', component: Register },
  { exact: true, path: '/confirm', component: Confirm },
  { exact: true, path: '/checkout', component: Checkout },
  { exact: true, path: '/payment/status', component: PaymentStatus }
];

const PublicRoute = ({ path, ...props }: any) => {
  React.useState(nprogress.start());
  useEffect(() => {
    nprogress.done();
    return () => {
      nprogress.start();
    };
  });
  return <Route key={path} path={path} {...props} />;
};

const publicRoutes = publicPaths.map(({ path, ...props }) => (
  <PublicRoute key={path} path={path} {...props} />
));

export default () => (
  <BrowserRouter>
    <React.Suspense fallback={<Ploader />}>
      <Switch>
        <Suspense fallback={<div />}>
          {publicRoutes}
          {/* <Route component={NotFound} /> */}
        </Suspense>
      </Switch>
    </React.Suspense>
  </BrowserRouter>
);
