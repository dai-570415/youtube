import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import Style from './Header.module.scss';
import { Store } from '../../store/';
import LogoImageWh from '../../img/yt_logo_cmyk_dark.svg';

const Header = () => {
    const [term, setTerm] = useState('');
    const history = useHistory();
    const { globalState, setGlobalState } = useContext(Store);
    const handleSubmit = e => {
        e.preventDefault();
        setGlobalState({ type: 'SET_TERM', payload: { term } });
        history.push(`search?query=${term}`);
    }
    useEffect(() => {
        setTerm(globalState.term);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={ Style.header }>
            <div className={ Style.item }>
                <Link to="/">
                    <img className={Style.logo} src={LogoImageWh} alt="YouTube" />
                </Link>
            </div>
            <div className={ Style.item }>
                <form onSubmit={ handleSubmit }>
                    <input
                        type="text" 
                        placeholder="検索"
                        onChange={ e => setTerm(e.target.value) }
                        // value={ term }
                    />
                    <button type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>
            <div className={ Style.item }>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </div>
    );
}

export default Header;
