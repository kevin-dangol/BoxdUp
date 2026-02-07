const { supabase, supabaseAdmin } = require('./config/db');

class User {
  // Create a new user
  static async create(email, username, password) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([{ email, username, password, is_admin: false }]);

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return data;
  }

  // Find a user by username
  static async findByUsername(username) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      throw new Error(`Failed to find user by username: ${error.message}`);
    }

    return data;
  }

  // Find a user by ID
  static async findById(id) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Failed to find user by ID: ${error.message}`);
    }

    return data;
  }

  // Update user card and subscription
  static async updateUserCardAndSubscription(email) {
    try {
      // Update user card relationship
      await supabaseAdmin
        .from('users')
        .update({ c_id: supabaseAdmin.from('cards').eq('email', email).select('c_id') })
        .eq('email', email);

      // Update user subscription relationship
      await supabaseAdmin
        .from('users')
        .update({ s_id: supabaseAdmin.from('subscriptions').eq('email', email).select('s_id') })
        .eq('email', email);
    } catch (error) {
      console.error('Error updating user card/subscription:', error);
      throw error;
    }
  }
}

module.exports = User;