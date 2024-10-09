import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdoptionRequests, editAdoption } from '../redux/adoptions/adoptionThunks';
import { editPuppy } from '../redux/puppies/puppyThunks'; 
import '../style/EveryPageStyle.css';

const ManageAdoption = () => {
    const dispatch = useDispatch();
    const { adoptionRequests } = useSelector((state) => state.adoptions);
    const [showAllRequests, setShowAllRequests] = useState(false);
    const [pendingRequests, setPendingRequests] = useState([]);
    const requestsToShow = showAllRequests ? adoptionRequests : pendingRequests;

    useEffect(() => {
        dispatch(fetchAdoptionRequests());
    }, [dispatch]);

    useEffect(() => {
        const filteredPendingRequests = adoptionRequests.filter((request) => request.status === 'pending');
        setPendingRequests(filteredPendingRequests);
    }, [adoptionRequests]);

    const toggleShowAllRequests = () => {
        setShowAllRequests(!showAllRequests);
    };

    const handleApprove = (id, puppyId) => {
        const updatedRequest = { status: 'approved' };

        dispatch(editAdoption({ id, updatedRequest })).then(() => {
            dispatch(editPuppy({ id: puppyId, updatedPuppy: { adopted: true } }));
            setPendingRequests(pendingRequests.filter((request) => request._id !== id));
        });
    };

    const handleReject = (id) => {
        const updatedRequest = { status: 'rejected' };
        dispatch(editAdoption({ id, updatedRequest })).then(() => {
            setPendingRequests(pendingRequests.filter((request) => request._id !== id));
        });
    };

    return (
        <div className="mt-4">
            <h3 className="mb-4">Adoption Management</h3>
            <button className="btn btn-secondary mb-3 small-margin" onClick={toggleShowAllRequests}>
                {showAllRequests ? 'Show only pending requests' : 'Show all requests'}
            </button>

            <ul className="list-group">
                {requestsToShow.map((request) => (
                    <li key={request._id} className="list-group-item">
                        <div>
                            <strong>Puppy:</strong> {request.puppy.name || 'N/A'} <br />
                            <strong>Adopter:</strong> {request.user.name || request.user.email || 'N/A'} <br />
                            <strong>Request Date:</strong> {new Date(request.adoptionDate).toLocaleDateString()} <br />
                            <strong>Status:</strong> {request.status} <br />
                            {request.status === 'pending' && (
                                <>
                                    <button className="btn btn-success me-2 mt-2 small-margin" onClick={() => handleApprove(request._id, request.puppy._id)}>
                                        Approve
                                    </button>
                                    <button className="btn btn-danger mt-2 small-margin" onClick={() => handleReject(request._id)}>
                                        Reject
                                    </button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageAdoption;
