import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
	mutation SignUp($name: String!, $email: String!, $password: String!) {
		publicSignUp(name: $name, email: $email, password: $password) {
			_id
			role
			name
			email
		}
	}
`;

export const LOG_IN_MUTATION = gql`
	mutation SignIn($email: String!, $password: String!) {
		publicSignIn(email: $email, password: $password) {
			authToken
			session {
				_id
				ip
				active
				userAgent
				expiresAt
				updatedAt
				createdAt
			}
			user {
				_id
				email
				name
				role
				createdAt
				updatedAt
			}
		}
	}
`;
