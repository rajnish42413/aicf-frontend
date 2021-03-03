import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Ploader from '@components/loader/PLoader';
import 'nprogress/nprogress.css';

const Home = React.lazy(() => import('../screens/home/Home'));
const Register = React.lazy(() => import('../screens/register/index'));
const Checkout = React.lazy(() => import('../screens/order/checkout'));
const PaymentSuccess = React.lazy(() => import('../screens/order/success'));
const Confirm = React.lazy(() => import('../screens/register/confirm'));

const publicPaths = [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/new-register', component: Register },
  { exact: true, path: '/confirm', component: Confirm },
  { exact: true, path: '/checkout', component: Checkout },
  { exact: true, path: '/payment/success', component: PaymentSuccess }
];

const publicRoutes = publicPaths.map(({ path, ...props }) => (
  <Route key={path} path={path} {...props} />
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
