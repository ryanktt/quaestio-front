import { PropsWithChildren } from 'react';
import style from './Wrapper.module.scss';

export default function Wrapper({ children }: PropsWithChildren) {
	return <div className={style.Wrapper}>{children}</div>;
}
