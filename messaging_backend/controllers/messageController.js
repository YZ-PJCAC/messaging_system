exports.sendMessage = async (req, res) => {
    const { receiver_id, content } = req.body;
    const sender_id = req.user.id;
  
    try {
      await pool.query("INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)", [sender_id, receiver_id, content]);
      res.json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Message sending failed" });
    }
  };
  
  exports.receiveMessages = async (req, res) => {
    const user_id = req.user.id;
    const result = await pool.query("SELECT * FROM messages WHERE receiver_id=$1", [user_id]);
    res.json(result.rows);
  };
  