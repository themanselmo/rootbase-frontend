import { useSelector } from 'react-redux';
import { asyncOrganization } from '../../../interfaces/organization';
import theme from '../../../theme';
import Loader from '../../atoms/icons/Loader';
import { LandingForm } from '../styled/LandingForm';

const SignUpForm = ({
  handleAuthChange,
  handleAuthSubmit
}: {
  // eslint-disable-next-line no-unused-vars
  handleAuthChange: (e: any) => void;
  // eslint-disable-next-line no-unused-vars
  handleAuthSubmit: (e: any) => void;
}) => {
  const { isLoading } = useSelector(
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    (state): asyncOrganization => state.authOrg
  );

  return (
    <LandingForm theme={theme} autoComplete="off" onSubmit={handleAuthSubmit}>
      <input
        className="input"
        name="name"
        placeholder="Organization Name"
        onChange={handleAuthChange}
      />
      <input
        className="input"
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleAuthChange}
      />
      <button type="submit">{isLoading ? <Loader width="15px" height="15px" /> : 'Sign up'}</button>
    </LandingForm>
  );
};

export default SignUpForm;
