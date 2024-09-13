import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "../Skeleton/Skeleton";
import { User } from "../User/User";
import { getUsers } from "../../utils/fetchClient";

export const Users = ({ setSuccess, setCount }) => {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('')

  useEffect(() => {
    setIsLoading(true);
    setError('');
    getUsers()
      .then(data => {
        setUsers(data.data);
      })
      .catch(err => {
        setError(err.error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  const handleSearchValue = (e) => {
    setQuery(e.target.value);
  }

  const filteredUsers = useMemo(() => {
    if (query.trim().length === 0) {
      return users;
    }

    const currentQuery = query.toLocaleLowerCase().trim();
  
    return users.filter(user => {
      if (user.first_name.toLocaleLowerCase().includes(currentQuery) || user.last_name.toLocaleLowerCase().includes(currentQuery) || user.email.toLocaleLowerCase().includes(currentQuery)) {
        return true;
      }
      return false;
    })
  }, [query, users]);

  const toggleInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(currentInvites => currentInvites.filter(el => el !== id));
    } else {
      setInvites(currentInvites => [...currentInvites, id]);
    }
  }

  const handleSend = () => {
    setSuccess(true);
    setCount(invites.length);
  }

  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input type="text" placeholder="Search user..." value={query} onChange={handleSearchValue} />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {filteredUsers.map(user => (
            <User user={user} key={user.id} isInvited={invites.includes(user.id)} toggleInvite={toggleInvite} />
          ))}
        </ul>
      )}
      <button className="send-invite-btn" onClick={handleSend} disabled={invites.length === 0}>Send an invitation</button>
    </>
  );
};