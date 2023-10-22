const userResponse = (data) => {
    return {
        user_id: data.user.id,
        role: data.user.role,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
        profile_image: data.user.profile_image
    };
};

const technicienResponse = (data) => {
    const user = userResponse(data);
    return {
        Technicien_id: data.id,
        ...user,
        dispo: data.dispo,
        grade: data.grade,
        SuccurcalId: data.SuccurcalId
    };
};

const ChefResponse = (data) => {
    const user = userResponse(data);
    return {
        Chef_id: data.id,
        ...user,
        grade: data.grade,
        SuccurcalId: data.SuccurcalId
    };
};

const adminResponse = (data) => {
    const user = userResponse(data);
    return {
        Admin_id: data.id,
        ...user
    };
};

export { technicienResponse, ChefResponse, adminResponse };
