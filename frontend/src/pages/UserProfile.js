import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFromToken, updateUserPassword, fetchUserAdoptions } from '../redux/auth/authThunks';
import { fetchPuppyDetails } from '../redux/puppies/puppyThunks';
import { Table, Button, Form, Alert } from 'react-bootstrap';
import Logout from '../components/Logout';
import '../style/EveryPageStyle.css';
import './UserProfile.css';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { userInfo, token } = useSelector((state) => state.auth);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [adoptionRequests, setAdoptionRequests] = useState([]);
    const [puppyNames, setPuppyNames] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [passwordMessage, setPasswordMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                await dispatch(fetchUserFromToken());
                const result = await dispatch(fetchUserAdoptions());

                if (result.meta.requestStatus === 'fulfilled') {
                    const { distanceAdoptions = [], fullAdoptions = [] } = result.payload;

                    const allRequests = [...distanceAdoptions, ...fullAdoptions];

                    const requestsWithPuppyDetails = await Promise.all(
                        allRequests.map(async (request) => {
                            const puppyId = request.puppy?._id || request.puppy;
                            let puppyDetails = null;

                            if (puppyId) {
                                const puppyResult = await dispatch(fetchPuppyDetails(puppyId));
                                if (puppyResult.meta.requestStatus === 'fulfilled') {
                                    puppyDetails = puppyResult.payload;
                                }
                            }

                            return {
                                ...request,
                                puppyDetails,
                                adoptionDate: new Date(request.adoptionDate),
                            };
                        })
                    );

                    const validRequests = requestsWithPuppyDetails.filter(
                        (request) => request.adoptionDate instanceof Date && !isNaN(request.adoptionDate)
                    );

                    setAdoptionRequests(validRequests);
                }
            }
        };

        fetchData();
    }, [dispatch, token]);

    useEffect(() => {
        const fetchPuppyNames = async () => {
            if (userInfo?.distantAdoptions) {
                const names = await Promise.all(
                    userInfo.distantAdoptions.map(async (id) => {
                        const result = await dispatch(fetchPuppyDetails(id));
                        if (result.meta.requestStatus === 'fulfilled') {
                            return result.payload.name;
                        }
                        return null;
                    })
                );
                setPuppyNames(names.filter((name) => name));
            }
        };
        fetchPuppyNames();
    }, [dispatch, userInfo]);

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setPasswordMessage(null);
        try {
            await dispatch(updateUserPassword({ oldPassword, newPassword })).unwrap();
            setPasswordMessage({ type: 'success', text: 'Password updated successfully' });
            setError(null);
        } catch (err) {
            setPasswordMessage({ type: 'danger', text: err.message });
            setSuccessMessage(null);
        }
    };

    return (
        <div className="everypage-box">
            <section className='userprofile-title'>
                <h2>User Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {passwordMessage && <Alert variant={passwordMessage.type}>{passwordMessage.text}</Alert>}
            </section>

            <section className='userprofile-user-info'>
                <h4>User Information</h4>
                <p><strong>Name:</strong> {userInfo?.name}</p>
                <p><strong>Email:</strong> {userInfo?.email}</p>
                <p><strong>Total Donations:</strong> {userInfo?.totalDonations} €</p>
                <p><strong>Active Distance Adoptions:</strong> {puppyNames.join(', ')}</p>
            </section>

            <section className='userprofile-password-change'>
                <h4>Change Password</h4>
                <Form onSubmit={handlePasswordUpdate}>
                    <Form.Group controlId="formOldPassword">
                        <Form.Label className='small-margin'>Current Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter current password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formNewPassword">
                        <Form.Label className='small-margin'>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button className='small-margin' variant="primary" type="submit">Update Password</Button>
                </Form>
            </section>

            <section className='userprofile-adoptions'>
                <h4>Submitted Adoption Requests</h4>
                {adoptionRequests.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Request Date</th>
                                <th>Puppy</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adoptionRequests.map((request) => (
                                <tr key={request._id}>
                                    <td>{new Date(request.adoptionDate).toLocaleDateString()}</td>
                                    <td>{request.puppyDetails?.name || 'Name not available'}</td>
                                    <td>{request.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No adoption requests submitted.</p>
                )}
            </section>

            <div className="userprofile-logout">
                <Logout />
            </div>
        </div>
    );
};

export default UserProfile;