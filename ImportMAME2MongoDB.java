package sandbox.util;

import static com.mongodb.client.model.Filters.eq;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import org.bson.Document;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;

import glog.domain.mamedb.Machine;
import glog.domain.mamedb.Mame;
import glog.importdb.MameXML;

/**
 * Grab all info from MAME and insert into a MongoDB database.
 * 
 * @author lestivalet
 *
 */
public class ImportMAME2MongoDB {

	public static void importListXML() throws Exception {
		MongoClient mongoClient = new MongoClient();
		MongoDatabase database = mongoClient.getDatabase("mamedb");
		MongoCollection<Document> collection = database.getCollection("machines");

		MameXML xml = new MameXML();
		Mame mame = xml.readXMLFileNew("c:/users/lestivalet/desktop/mame.xml");
		Gson gson = new Gson();
		for (Machine m : mame.getMachine()) {
			BasicDBObject obj = (BasicDBObject) JSON.parse(gson.toJson(m));
			collection.insertOne(new Document(obj));
		}
		mongoClient.close();
	}

	public static void importHistory() throws Exception {
		BufferedReader br = new BufferedReader(new FileReader(new File("c:/users/lestivalet/desktop/history.dat")));
		String line = null;
		String history = "";
		String rom = "";
		boolean info = false;

		MongoClient mongoClient = new MongoClient();
		MongoDatabase database = mongoClient.getDatabase("mamedb");
		MongoCollection<Document> collection = database.getCollection("machines");

		while (br.ready()) {
			line = br.readLine().trim();
			if (line.startsWith("$info")) {
				rom = line.split("=")[1];
				history = "";
				line = br.readLine().trim();
				info = true;
			}
			if (info && line.startsWith("$end")) {
				info = false;
				String[] roms = rom.split(",");
				for (String r : roms) {
					System.out.println(r);
					System.out.println(history);
					collection.updateOne(eq("name", r), new Document("$set", new Document("history", history)));
				}
			}
			if (!line.startsWith("$bio")) {
				history += line + "<br>";
			}
		}
		br.close();
		mongoClient.close();
	}

	public static void importCatVer() throws Exception {
		MongoClient mongoClient = new MongoClient();
		MongoDatabase database = mongoClient.getDatabase("mamedb");
		MongoCollection<Document> collection = database.getCollection("machines");
		BufferedReader br = new BufferedReader(new FileReader(new File("c:/users/lestivalet/desktop/catver.ini")));

		String line = null;
		boolean verAdded = false;
		boolean category = false;

		// Loop through all lines.
		while (br.ready()) {
			// Read a line.
			line = br.readLine().trim();

			// Check if we are in [VerAdded] or [Category] section.
			if (line.startsWith("[VerAdded]")) {
				category = false;
				verAdded = true;
				line = br.readLine().trim();
			} else if (line.startsWith("[Category]")) {
				category = true;
				verAdded = false;
				line = br.readLine().trim();
			}

			if (!"".equals(line)) {
				// values[0] has game name.
				// values[1] has its category or the version added to mame
				// depending of current section.
				String[] values = line.split("=");

				if (category) {
					collection.updateOne(eq("name", values[0].trim()),
							new Document("$set", new Document("category", values[1].trim())));
					System.out.println(values[0].trim());
					System.out.println(values[1].trim());
				} else if (verAdded) {
					collection.updateOne(eq("name", values[0].trim()),
							new Document("$set", new Document("veradded", values[1].trim())));
					System.out.println(values[0].trim());
					System.out.println(values[1].trim());
				}

			}
		}
		br.close();
		mongoClient.close();
	}

	public static void importMAMEInfo() throws Exception {
		BufferedReader br = new BufferedReader(new FileReader(new File("c:/users/lestivalet/desktop/mameinfo.dat")));
		String line = null;
		String info = "";
		String rom = null;
		boolean driver = false;
		boolean mame = false;

		MongoClient mongoClient = new MongoClient();
		MongoDatabase database = mongoClient.getDatabase("mamedb");
		MongoCollection<Document> collection = database.getCollection("machines");

		// Read file line per line.
		while (br.ready()) {
			line = br.readLine().trim();
			if (line.startsWith("$info")) {
				rom = line.split("=")[1];
				info = "";
				line = br.readLine().trim();
				if (line.startsWith("$mame")) {
					mame = true;
					driver = false;
				} else if (line.startsWith("$drv")) {
					driver = true;
					mame = false;
				}
				line = br.readLine().trim();
			} else if (line.startsWith("$end")) {
				// Update info of games.
				if (mame) {
					System.out.println(rom);
					collection.updateOne(eq("name", rom), new Document("$set", new Document("info", info)));
				} else if (driver) {
				}
			}
			info += line + "<br>";
		}
		br.close();
		mongoClient.close();
	}

	public static void main(String[] args) throws Exception {
		// ImportMAME2MongoDB.importListXML();
		// ImportMAME2MongoDB.importHistory();
		// ImportMAME2MongoDB.importCatVer();
		ImportMAME2MongoDB.importMAMEInfo();
	}

}
